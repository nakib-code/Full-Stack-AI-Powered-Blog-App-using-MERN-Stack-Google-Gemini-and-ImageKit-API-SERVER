import main from "../../db/gemini";
import pool from "../../db";


const createBlog = async (data: any) => {
  const {
    title,
    subtitle,
    description,
    category,
    image,
    isPublished,
  } = data;

  const result = await pool.query(
    `
      INSERT INTO blogs
      (
        title,
        subtitle,
        description,
        category,
        image,
        is_published
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
    `,
    [
      title,
      subtitle,
      description,
      category,
      image,
      isPublished ?? false,
    ]
  );

  return result.rows[0];
};



const getAllBlogs = async () => {
  const result = await pool.query(
    `
    SELECT * FROM blogs
    WHERE is_published = true
    ORDER BY created_at DESC
    `
  );

  return result.rows;
};


const getBlogById = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM blogs
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};



const updateBlog = async (id: string, data: any) => {
  const existingBlog = await pool.query(
    `SELECT * FROM blogs WHERE id = $1`,
    [id]
  );

  if (existingBlog.rows.length === 0) {
    return null;
  }

  const blog = existingBlog.rows[0];

  const result = await pool.query(
    `
    UPDATE blogs
    SET
      title = $1,
      subtitle = $2,
      description = $3,
      category = $4,
      image = $5,
      is_published = $6,
      updated_at = NOW()
    WHERE id = $7
    RETURNING *
    `,
    [
      data.title ?? blog.title,
      data.subtitle ?? blog.subtitle,
      data.description ?? blog.description,
      data.category ?? blog.category,
      data.image ?? blog.image,
      data.isPublished ?? blog.is_published,
      id,
    ]
  );

  return result.rows[0];
};



const deleteBlog = async (id: string) => {
  await pool.query(`DELETE FROM comments WHERE blog_id=$1`, [id]);
  await pool.query(`DELETE FROM blogs WHERE id=$1`, [id]);
};



const togglePublish = async (id: string) => {
  const blog = await pool.query(
    `SELECT is_published FROM blogs WHERE id=$1`,
    [id]
  );

  if (!blog.rows.length) throw new Error("Blog not found");

  const newStatus = !blog.rows[0].is_published;

  await pool.query(
    `UPDATE blogs SET is_published=$1 WHERE id=$2`,
    [newStatus, id]
  );
};


 const generateContent = async (prompt: string) => {
  const content = await main(
    `${prompt} Generate a blog in simple text format`
  );

  return content;
};

export const blogService ={
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  togglePublish,
  generateContent
}
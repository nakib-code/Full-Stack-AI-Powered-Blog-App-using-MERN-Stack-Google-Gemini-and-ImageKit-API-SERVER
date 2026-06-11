import pool from "../../db";

/* ---------------- ADD COMMENT ---------------- */
const addComment = async (data: any) => {
  const { blog_id, name, content } = data;

  const result = await pool.query(
    `
    INSERT INTO comments (blog_id, name, content)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [blog_id, name, content]
  );

  return result.rows[0];
};

/* ---------------- GET COMMENTS BY BLOG ---------------- */
const getBlogComments = async (blog_id: string) => {
  const result = await pool.query(
    `
    SELECT *
    FROM comments
    WHERE blog_id = $1 AND is_approved = true
    ORDER BY created_at DESC
    `,
    [blog_id]
  );

  return result.rows; 
};

/* ---------------- GET ALL COMMENTS (ADMIN) ---------------- */
const getAllComments = async () => {
  const result = await pool.query(
    `
    SELECT 
      comments.*,
      blogs.title AS blog_title
    FROM comments
    LEFT JOIN blogs ON comments.blog_id = blogs.id
    ORDER BY comments.created_at DESC
    `
  );

  return result.rows;
};

/* ---------------- DELETE COMMENT ---------------- */
const deleteComment = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM comments
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};

/* ---------------- APPROVE COMMENT ---------------- */
const approveComment = async (id: string) => {
  const result = await pool.query(
    `
    UPDATE comments
    SET is_approved = true
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};

export const commentService = {
  addComment,
  getBlogComments,
  getAllComments,
  deleteComment,
  approveComment,
};
import pool from "../../db";

/* ---------------- DASHBOARD ---------------- */
const getDashboard = async () => {
  const blogs = await pool.query(`SELECT COUNT(*) FROM blogs`);
  const comments = await pool.query(`SELECT COUNT(*) FROM comments`);
  const pendingComments = await pool.query(
    `SELECT COUNT(*) FROM comments WHERE status = 'pending'`
  );

  return {
    totalBlogs: Number(blogs.rows[0].count),
    totalComments: Number(comments.rows[0].count),
    pendingComments: Number(pendingComments.rows[0].count),
  };
};

/* ---------------- BLOG ACTIONS ---------------- */

// Approve Blog
const approveBlogById = async (id: string) => {
  const result = await pool.query(
    `UPDATE blogs SET status = 'approved' WHERE id = $1 RETURNING *`,
    [id]
  );

  return result.rows[0];
};

// Delete Blog
const deleteBlogById = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM blogs WHERE id = $1 RETURNING *`,
    [id]
  );

  return result.rows[0];
};

/* ---------------- COMMENT ACTIONS ---------------- */

// Approve Comment
const approveCommentById = async (id: string) => {
  const result = await pool.query(
    `UPDATE comments SET status = 'approved' WHERE id = $1 RETURNING *`,
    [id]
  );

  return result.rows[0];
};

// Delete Comment
const deleteCommentById = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM comments WHERE id = $1 RETURNING *`,
    [id]
  );

  return result.rows[0];
};

/* ---------------- EXPORT ---------------- */

export const adminService = {
  getDashboard,
  approveBlogById,
  deleteBlogById,
  approveCommentById,
  deleteCommentById,
};
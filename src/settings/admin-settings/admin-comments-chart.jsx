import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Chart } from '@antv/g2';

function AdminCommentsChart({ comments }) {

  useEffect(() => {
    if (comments.length === 0) {
      return null;
    }
  
    // 处理数据函数，未来单独迁移计算模块
    // "id": 2,
    // "book_id": 1,
    // "author": "admin",

    let author2comment = {};
    let book2comment = {};
    comments.forEach(comment => {
      const { book_id, author } = comment;
      if (!author2comment[author]) {
        author2comment[author] = 1;
      } else {
        author2comment[author] = author2comment[author] + 1;
      }
      if (!book2comment[book_id]) {
        book2comment[book_id] = 1;
      } else {
        book2comment[book_id] = book2comment[book_id] + 1;
      }
    });
  
    author2comment = Object.keys(author2comment).map(key => {
      return {
        author: key,
        count: author2comment[key]
      };
    });
  
    book2comment = Object.keys(book2comment).map(key => {
      return {
        book: key,
        count: book2comment[key]
      };
    });

    // 注意：目前使用 4.x 版本 g2，最新 5.x 版本可能有问题
    // 文档：https://g2-v4.antv.vision/zh
    // 我们需要获取不同用户的评论数量，不同书籍的评论数量
    const chart = new Chart({
      container: 'admin-comments-chart-author2comment',
      width: 600,
      height: 300,
    });
    chart.data(author2comment);
    chart.interval().position('author*count');
    chart.render();

    const chart2 = new Chart({
      container: 'admin-comments-chart-book2comment',
      width: 600,
      height: 300,
    });
    chart2.data(author2comment);
    chart2.interval().position('book*count');
    chart2.render();
  }, [comments]);

  return (
    <div className="admin-comments-chart">
      <div id="admin-comments-chart-author2comment"></div>
      <div id="admin-comments-chart-book2comment"></div>
    </div>
  );
}

AdminCommentsChart.propTypes = {
  comments: PropTypes.array,
};

export default AdminCommentsChart;

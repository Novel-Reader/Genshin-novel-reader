import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Chart } from '@antv/g2';

function AdminCommentsChartType({ comments, dataSource, chartType }) {

  let chart = useRef();
  let author2comment = useRef({});
  let book2comment = useRef({});

  useEffect(() => {
    const author2commentMap = {};
    const book2commentMap = {};
    comments.forEach(comment => {
      const { book_id, author } = comment;
      if (!author2commentMap[author]) {
        author2commentMap[author] = 1;
      } else {
        author2commentMap[author] = author2commentMap[author] + 1;
      }
      if (!book2commentMap[book_id]) {
        book2commentMap[book_id] = 1;
      } else {
        book2commentMap[book_id] = book2commentMap[book_id] + 1;
      }
    });
    author2comment.current = Object.keys(author2commentMap).map(key => {
      return {
        author: key,
        count: author2commentMap[key]
      };
    });
    book2comment.current = Object.keys(book2commentMap).map(key => {
      return {
        book: key,
        count: book2commentMap[key]
      };
    });
  }, [comments]);

  useEffect(() => {
    if (chart && chart.current && chart.current.destroy) {
      chart.current.destroy();
    }
    let chartData = null;
    if (dataSource === 'author*count') {
      chartData = author2comment.current;
    } else if (dataSource === 'book*count') {
      chartData = book2comment.current;
    }
    chart.current = new Chart({
      container: 'admin-comments-chart-container',
      width: 600,
      height: 300,
      padding: [20, 20, 20, 20],
    });
    chart.current.data(chartData);
    chart.current.scale('sales', { nice: true });
    if (chartType === 'histogram') {
      chart.current.interval().position(dataSource);
    } else if (chartType === 'line') {
      chart.current.line().position(dataSource);
    }
    chart.current.render();
  }, [comments, dataSource, chartType]);

  return (
    <div className='admin-comments-chart-type' id="admin-comments-chart-container"></div>
  );
}

AdminCommentsChartType.propTypes = {
  comments: PropTypes.array,
  dataSource: PropTypes.oneOf(['author*count', 'book*count']).isRequired,
  chartType: PropTypes.oneOf(['histogram', 'line']).isRequired,
};

export default AdminCommentsChartType;

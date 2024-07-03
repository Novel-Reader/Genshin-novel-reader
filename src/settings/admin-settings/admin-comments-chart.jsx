import React, { useState } from "react";
import PropTypes from "prop-types";
import AdminCommentsChartSetting from './admin-comments-chart-setting';
import AdminCommentsChartType from './admin-comments-chart-type';

function AdminCommentsChart({ comments }) {
  const dataSourceOptions = [
    {
      label: '按作者分类',
      value: 'author*count',
    },
    {
      label: '按书籍分类',
      value: 'book*count',
    }
  ];
  const chartTypeOptions = [
    {
      value: 'line',
      label: '折线图',
    },
    {
      value: 'histogram',
      label: '直方图',
    },
  ];
  const [selectedDataSource, setSelectedDataSource] = useState(dataSourceOptions[0]);
  const [selectedChartType, setSelectedChartType] = useState(chartTypeOptions[0]);

  return (
    <div className="admin-comments-chart">
      <AdminCommentsChartType
        comments={comments}
        dataSource={selectedDataSource.value}
        chartType={selectedChartType.value}
      />
      <AdminCommentsChartSetting
        selectedDataSource={selectedDataSource}
        selectedChartType={selectedChartType}
        dataSourceOptions={dataSourceOptions}
        chartTypeOptions={chartTypeOptions}
        onChangeDataSource={setSelectedDataSource}
        onChangeChartType={setSelectedChartType}
      />
    </div>
  );
}

AdminCommentsChart.propTypes = {
  comments: PropTypes.array,
};

export default AdminCommentsChart;

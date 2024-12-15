import React, { useState } from "react";
import PropTypes from "prop-types";
import { Select, Form } from "antd";
import { MenuSelectStyle } from "../../utils";

const AdminCommentsChartSetting = ({
  selectedDataSource,
  selectedChartType,
  setSelectedDataSource,
  setSelectedChartType,
  dataSourceOptions,
  chartTypeOptions,
}) => {
  const [dataSource, setDataSource] = useState(selectedDataSource || dataSourceOptions[0]);
  const [chartType, setChartType] = useState(selectedChartType || chartTypeOptions[0]);

  const handleDataSourceChange = (value) => {
    setDataSource(value);
    setSelectedDataSource(dataSourceOptions.find(option => option.value === value));
  };

  const handleChartTypeChange = (value) => {
    setChartType(value);
    setSelectedChartType(chartTypeOptions.find(option => option.value === value));
  };

  return (
    <Form>
      <Form.Item label={'选择数据来源'}>
        <Select
          value={dataSource}
          options={dataSourceOptions}
          onChange={handleDataSourceChange}
          style={MenuSelectStyle}
        />
      </Form.Item>
      <Form.Item label={'选择图表类型'}>
        <Select
          value={chartType}
          options={chartTypeOptions}
          onChange={handleChartTypeChange}
          style={MenuSelectStyle}
        />
      </Form.Item>
    </Form>
  );
};

AdminCommentsChartSetting.propTypes = {
  selectedDataSource: PropTypes.object,
  selectedChartType: PropTypes.object,
  dataSourceOptions: PropTypes.array.isRequired,
  chartTypeOptions: PropTypes.array.isRequired,
  setSelectedDataSource: PropTypes.func.isRequired,
  setSelectedChartType: PropTypes.func.isRequired,
};

export default AdminCommentsChartSetting;

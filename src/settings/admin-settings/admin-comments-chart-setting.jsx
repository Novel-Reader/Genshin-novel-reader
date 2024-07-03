import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Label, FormGroup } from "reactstrap";
import { MenuSelectStyle } from "../../utils";

function AdminCommentsChartSetting({
  selectedDataSource,
  selectedChartType,
  onChangeDataSource,
  onChangeChartType,
  dataSourceOptions,
  chartTypeOptions,
}) {
  const preCls = "admin-comments-chart-setting";
  return (
    <div className={preCls}>
      <FormGroup>
        <Label>{'选择数据来源'}</Label>
        <Select
          value={selectedDataSource || dataSourceOptions[0]}
          options={dataSourceOptions}
          onChange={onChangeDataSource}
          captureMenuScroll={false}
          className={`${preCls}-select`}
          classNamePrefix
          styles={MenuSelectStyle}
        />
      </FormGroup>
      <FormGroup>
        <Label>{'选择图表类型'}</Label>
        <Select
          value={selectedChartType || chartTypeOptions[0]}
          options={chartTypeOptions}
          onChange={onChangeChartType}
          captureMenuScroll={false}
          className={`${preCls}-select`}
          classNamePrefix
          styles={MenuSelectStyle}
        />
      </FormGroup>
    </div>
  );
}

AdminCommentsChartSetting.propTypes = {
  selectedDataSource: PropTypes.object,
  selectedChartType: PropTypes.object,
  dataSourceOptions: PropTypes.array.isRequired,
  chartTypeOptions: PropTypes.array.isRequired,
  onChangeDataSource: PropTypes.func.isRequired,
  onChangeChartType: PropTypes.func.isRequired,
};

export default AdminCommentsChartSetting;

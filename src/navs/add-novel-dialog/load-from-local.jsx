import React, { Component } from "react";
import { Button, FormGroup, Form, Label, Input, ModalFooter } from "reactstrap";
import Select from "react-select";
import { MenuSelectStyle } from "../../utils";

export default class LoadFromLocal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      filename: "",
      author: "",
      abstract: "",
      currentSelected: null,
    };
    this.options = [
      { value: "古典", label: "古典" },
      { value: "同人", label: "同人" },
      { value: "言情", label: "言情" },
      { value: "其他", label: "其他" },
    ];
  }

  onClick = () => {
    this.uploadRef.click();
  }

  onChange = (option) => {
    this.setState({ currentSelected: option });
  }

  onFileChange = (e) => {
    const file = this.uploadRef.files[0];
    let reader = new FileReader();
    reader.readAsText(file, "utf-8");
    const that = this;
    reader.onload = function () {
      that.tmpFile = this.result;
      that.setState({
        file: file,
      }, () => {
        that.initFileInfo();
      }); 
    };
  }

  initFileInfo = () => {
    this.setState({
      filename: this.state.file.name,
      author: "",
      abstract: this.tmpFile.slice(0, 100).trim(),
    });
  }

  onClear = () => {
    this.setState({ file: null });
    this.tmpFile = null;
  }

  onUpload = () => {
    const { filename, file, author, abstract, currentSelected } = this.state;
    const tag = currentSelected ? currentSelected.map(option => option.value).join(" ") : "";
    this.props.addFile({
      name: filename.trim(),
      size: file.size,
      author: author,
      context: this.tmpFile,
      abstract: abstract.trim(),
      tag,
    });
    this.props.toggleDialog();
  }

  render() {
    if (!this.state.file) {
      return (
        <div>
          <Button onClick={this.onClick} color="primary">选择文件</Button>
          <input
            className="local-file-input"
            type="file"
            accept=".txt, .md"
            onChange={this.onFileChange}
            ref={node => this.uploadRef = node}
          ></input>
        </div>
      );
    }
    return (
      <div className="local-file-info">
        <Form>
          <FormGroup>
            <Label for="filename">
              名称
            </Label>
            <Input
              id="filename"
              name="text"
              placeholder="请输入上传作品的名称"
              type="text"
              value={this.state.filename}
              onChange={(e) => { this.setState({ filename: e.target.value }); }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="author">
              作者
            </Label>
            <Input
              id="author"
              name="text"
              placeholder="请输入作者名称"
              type="text"
              value={this.state.author}
              onChange={(e) => { this.setState({ author: e.target.value }); }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="filetag">
              分类
            </Label>
            <Select
              value={this.state.currentSelected}
              options={this.options}
              onChange={this.onChange}
              captureMenuScroll={false}
              className="load-from-local-type-select"
              classNamePrefix
              isMulti
              placeholder='选择分类'
              styles={MenuSelectStyle}
            />
          </FormGroup>
          <FormGroup>
            <Label for="abstract">
              摘要（默认选择原文前 100 字）
            </Label>
            <Input
              className="load-from-local-abstract"
              id="abstract"
              name="text"
              type="textarea"
              value={this.state.abstract}
              onChange={(e) => { this.setState({ abstract: e.target.value }); }}
            />
          </FormGroup>
          <ModalFooter>
            <Button onClick={this.onUpload} color="primary">上传</Button>
            <Button onClick={this.onClear} color="secondary">取消</Button>
          </ModalFooter>
        </Form>
      </div>
    );
  }
}

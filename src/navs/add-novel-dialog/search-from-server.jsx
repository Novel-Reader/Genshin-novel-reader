import React, { Component } from "react";
import PropTypes from "prop-types";
import toaster from "../../common/toast";
import intl from "react-intl-universal";
import { Button, Input } from "reactstrap";
import BookList from "./book-list";

class SearchFromServer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      novelList: [],
    };
    this.searchInputRef = React.createRef();
  }

  searchNovels = () => {
    const keyword = this.searchInputRef.current.value.trim();
    if (!keyword) {
      toaster.danger(intl.get('Missing some required fields'));
      return;
    }
    this.setState({ isSearch: true });
    window.app.api.searchNovel(keyword).then((res) => {
      this.setState({
        isLoading: false,
        novelList: res.data,
      });
    }).catch((err) => {
      toaster.danger(err);
      this.setState({
        isLoading: false,
      });
    });
  };

  render() {
    return (
      <div className="novel-list">
        <div>
          <Input type="text" innerRef={this.searchInputRef} autoFocus />
          <Button color="success" onClick={this.searchNovels}>{intl.get('Search')}</Button>
        </div>
        {this.state.isLoading ?
          <div>{intl.get('Searching...')}</div>
          :
          <BookList
            novelList={this.state.novelList}
            downLoadNovel={this.props.downLoadNovel}
          />
        }
      </div>
    );
  }
}

SearchFromServer.propTypes = {
  downLoadNovel: PropTypes.func.isRequired,
};

export default SearchFromServer;

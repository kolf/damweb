import React, {Component, PropTypes} from 'react';
import {TreeSelect} from 'antd';
import {connect} from 'react-redux';
import {queryCategory} from '../actions/category';

const toTreeData = data => {
  return data.map((item, i) => {
    // item.key = item.key || 0;
    let obj = {
      // key: `${item.key}-${i}`,
      value: item.code + '',
      label: item.name
    };
    if(item.childNode.length){
      obj.children= toTreeData(item.childNode)
    }
    return obj;
  })
};


class CategorySelect extends Component {
  constructor(props) {
    super(props);
    this.state={
      value: props.defaultValue
    }
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(queryCategory())
  }

  onChange(value) {
    this.setState({
      value
    });
    this.props.onChange(value)
  }

  render() {
    const categoryData = this.props.categorys.data || [];
    return <TreeSelect size="large" allowClear dropdownStyle={{maxHeight: 400, overflow: 'auto'}} treeData={toTreeData(categoryData)} placeholder="请选择" value={this.state.value} treeDefaultExpandAll onChange={this.onChange.bind(this)}/>;
  }
}

CategorySelect.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {categorys} = state;
  return {
    categorys
  };
}

export default connect(mapStateToProps)(CategorySelect);

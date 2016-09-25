import React, { Component, PropTypes } from 'react';
import { Tag, Input } from 'antd';

let index = 3;

export default class Tags extends Component {
  static defaultProps = {

  };

  static propTypes = {
    data: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  }

  handleClose(key) {
    const data = [...this.props.data].filter(tag => (tag.key !== key) && tag);
    this.setState({ data });
  }

  addTag() {
    const data = [...this.props.data];
    index += 1;
    data.push({ key: index, name: `新标签${index}` });
    this.setState({ data });
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        {data.map(tag =>
          <Tag key={tag.key} closable={tag.key !== 1} afterClose={() => this.handleClose(tag.key)}>
            {tag.name}
          </Tag>
        )}
        <Input size="small" style={{width:80}} placeholder="添加新标签" />
      </div>
    );
  }
}

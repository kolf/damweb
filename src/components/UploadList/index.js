import React, { Component, PropTypes } from 'react';
import { Upload, Tag, Button } from 'antd';

let index = 9;

export default class UploadList extends Component {
  constructor(props) {
    super(props);
    this.addTag = this.addTag.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      tags: []
    }
  }

  handleClose(key) {
    const tags = [...this.state.tags].filter(tag => (tag.key !== key) && tag);
    this.setState({ tags });
  }

  addTag() {
    const tags = [...this.state.tags];
    index += 1;
    tags.push({ key: index, name: `新标签${index}` });
    this.setState({ tags });
  }

  render() {
    const { tags } = this.state;

    return (
      <div>
        {tags.map(tag =>
          <Tag key={tag.key} closable={tag.key !== 1} afterClose={() => this.handleClose(tag.key)}>
            {tag.name}
          </Tag>
        )}
        <Button size="small" type="dashed" onClick={this.addTag}>+ 添加标签</Button>
      </div>
    );
  }
}

import React from "react";

import * as S from "../styles/NoteBlockStyle";

class NoteBlock extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
      htmlBackup: null,
      html: "",
      tag: "p",
    };
  }

  componentDidMount() {
    this.setState({ html: this.props.html, tag: this.props.tag });
  }

  componentDidUpdate(prevProps, prevState) {
    const hasHtmlChanged = prevState.html !== this.state.html;
    const hasTagChanged = prevState.tag !== this.state.tag;

    if (hasHtmlChanged || hasTagChanged) {
      this.props.updatePage({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
      });
    }
  }

  handleChange(e) {
    this.setState({ html: e.target.value });
  }

  render() {
    return (
      <S.NoteBlock
        innerRef={this.contentEditable}
        html={this.state.html}
        tagName={this.state.tag}
        onChange={this.handleChange}
      />
    );
  }
}

export default NoteBlock;

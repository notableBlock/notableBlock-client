import React from "react";

import * as S from "../styles/NoteBlockStyle";

class NoteBlock extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
      htmlBackup: null,
      html: "",
      tag: "p",
      previousKey: "",
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

  handleKeyDown(e) {
    if (e.key === "/") {
      this.setState({ htmlBackup: this.state.html });
    } else if (e.key === "Enter" && this.state.previousKey !== "Shift") {
      if (e.nativeEvent.isComposing) return;
      e.preventDefault();
      this.props.addBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
      });
    } else if (e.key === "Backspace" && (this.state.html === "" || this.state.html === "<br>")) {
      e.preventDefault();
      this.props.deleteBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
      });
    }

    this.setState({ previousKey: e.key });
  }

  render() {
    return (
      <S.NoteBlock
        innerRef={this.contentEditable}
        html={this.state.html}
        tagName={this.state.tag}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default NoteBlock;

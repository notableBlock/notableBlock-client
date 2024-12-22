import React from "react";

import SelectMenu from "./SelectMenu";

import getCaretCoordinates from "../utils/getCaretCoordinates";
import moveCaretToEnd from "../utils/moveCaretToEnd";
import { tagsMenu } from "../assets/data/menu";

import * as S from "../styles/NoteBlockStyle";

class NoteBlock extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOpenSelectMenu = this.handleOpenSelectMenu.bind(this);
    this.handleCloseSelectMenu = this.handleCloseSelectMenu.bind(this);
    this.handleSelectTag = this.handleSelectTag.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
      htmlBackup: null,
      html: "",
      tag: "p",
      previousKey: "",
      isSelectMenuOpen: false,
      selectMenuPosition: {
        x: null,
        y: null,
      },
    };
  }

  componentDidMount() {
    this.setState({ html: this.props.html, tag: this.props.tag });
  }

  componentDidUpdate(prevProps, prevState) {
    const hasHTMLChanged = prevState.html !== this.state.html;
    const hasTagChanged = prevState.tag !== this.state.tag;

    if (hasHTMLChanged || hasTagChanged) {
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
    } else if (
      e.key === "Enter" &&
      this.state.previousKey !== "Shift" &&
      !this.state.isSelectMenuOpen
    ) {
      if (e.nativeEvent.isComposing) return;
      e.preventDefault();

      this.props.addBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
      });
    } else if (
      e.key === "Backspace" &&
      (!this.state.html || this.state.html === "<br>") &&
      this.props.blockCount !== 1
    ) {
      e.preventDefault();

      this.props.deleteBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
      });
    }

    this.setState({ previousKey: e.key });
  }

  handleKeyUp(e) {
    if (e.key === "/") this.handleOpenSelectMenu();
  }

  handleOpenSelectMenu() {
    const { x, y } = getCaretCoordinates();

    this.setState({
      isSelectMenuOpen: true,
      selectMenuPosition: { x, y },
    });

    document.addEventListener("click", this.handleCloseSelectMenu);
  }

  handleCloseSelectMenu() {
    this.setState({
      htmlBackup: null,
      isSelectMenuOpen: false,
      selectMenuPosition: { x: null, y: null },
    });

    document.removeEventListener("click", this.handleCloseSelectMenu);
  }

  handleSelectTag(tag) {
    this.setState({ tag: tag, html: this.state.htmlBackup }, () => {
      moveCaretToEnd(this.contentEditable.current);
      this.handleCloseSelectMenu();
    });
  }

  render() {
    return (
      <>
        {this.state.isSelectMenuOpen && (
          <SelectMenu
            onSelect={this.handleSelectTag}
            onClose={this.handleCloseSelectMenu}
            position={this.state.selectMenuPosition}
            menu={tagsMenu}
          />
        )}
        <S.NoteBlockItem
          innerRef={this.contentEditable}
          html={this.state.html}
          tagName={this.state.tag}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          disabled={this.props.isSharedPage}
        />
      </>
    );
  }
}

export default NoteBlock;

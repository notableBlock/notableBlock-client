import React from "react";

import SelectMenu from "./SelectMenu";

import { uploadNoteImage } from "../services/note";
import getCaretCoordinates from "../utils/getCaretCoordinates";
import moveCaretToEnd from "../utils/moveCaretToEnd";
import { tagsMenu } from "../assets/data/menu";
import dragHandleIcon from "../assets/images/drag-handle-icon.png";

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
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.contentEditable = React.createRef();
    this.fileInput = null;
    this.state = {
      htmlBackup: null,
      html: "",
      tag: "p",
      imageURL: "",
      previousKey: "",
      isSelectMenuOpen: false,
      selectMenuPosition: {
        x: null,
        y: null,
      },
    };
  }

  componentDidMount() {
    this.setState({ html: this.props.html, tag: this.props.tag, imageURL: this.props.imageURL });
  }

  componentDidUpdate() {
    const isHTMLChanged = this.props.html !== this.state.html;
    const isTagChanged = this.props.tag !== this.state.tag;
    const isImageChanged = this.props.imageURL !== this.state.imageURL;
    const hasImageUrlWithoutImageTag = this.state.tag !== "img" && Boolean(this.state.imageURL);

    const updatePage = () => {
      if (isHTMLChanged || isTagChanged || isImageChanged) {
        this.props.onUpdatePage({
          id: this.props.id,
          html: this.state.html,
          tag: this.state.tag,
          imageURL: this.state.imageURL,
        });
      }
    };

    if (hasImageUrlWithoutImageTag) {
      this.setState({ html: "", imageURL: "" }, updatePage);
    } else {
      updatePage();
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

      this.props.onAddBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
      });
    } else if (
      e.key === "Backspace" &&
      (!this.state.html || this.state.html === "<br>") &&
      this.props.blockCount !== 1
    ) {
      e.preventDefault();

      this.props.onDeleteBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
      });
    } else if (e.key === "ArrowUp" && this.state.isSelectMenuOpen === false) {
      if (e.nativeEvent.isComposing) return;
      e.preventDefault();

      this.props.onFocusBlockByArrowKey(
        {
          id: this.props.id,
          ref: this.contentEditable.current,
        },
        e.key
      );
    } else if (e.key === "ArrowDown" && this.state.isSelectMenuOpen === false) {
      if (e.nativeEvent.isComposing) return;
      e.preventDefault();

      this.props.onFocusBlockByArrowKey(
        {
          id: this.props.id,
          ref: this.contentEditable.current,
        },
        e.key
      );
    }

    this.setState({ previousKey: e.key });
  }

  handleKeyUp(e) {
    if (e.key === "/") this.handleOpenSelectMenu();
  }

  handleOpenSelectMenu(e) {
    const { x, y } = getCaretCoordinates();
    const isDragHandleClicked = Boolean(e?.target);

    if (isDragHandleClicked) {
      this.setState({ htmlBackup: this.state.html });
    }

    this.setState({
      isSelectMenuOpen: true,
      selectMenuPosition: { x, y },
    });

    setTimeout(() => {
      document.addEventListener("click", this.handleCloseSelectMenu);
    }, 0);
  }

  handleCloseSelectMenu() {
    this.setState({
      isSelectMenuOpen: false,
      selectMenuPosition: { x: null, y: null },
    });

    document.removeEventListener("click", this.handleCloseSelectMenu);
  }

  handleSelectTag(tag) {
    if (tag === "img") {
      this.setState({ ...this.state, tag: tag }, () => {
        this.handleCloseSelectMenu();

        if (this.fileInput) {
          this.fileInput.click();
        }

        this.props.onAddBlock({
          id: this.props.id,
          html: "",
          tag: "p",
          imageURL: "",
          ref: this.contentEditable.current,
        });
      });
    } else {
      this.setState({ tag: tag, html: this.state.htmlBackup }, () => {
        moveCaretToEnd(this.contentEditable.current);
        this.handleCloseSelectMenu();
      });
    }
  }

  async handleImageUpload() {
    if (this.fileInput && this.fileInput.files[0]) {
      const imageFile = this.fileInput.files[0];
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const imageURL = await uploadNoteImage(this.props.noteId, formData);
        this.setState({ imageURL: imageURL });
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    return (
      <S.NoteBlockLayout>
        {this.state.isSelectMenuOpen && (
          <SelectMenu
            onSelect={this.handleSelectTag}
            onClose={this.handleCloseSelectMenu}
            position={this.state.selectMenuPosition}
            menu={tagsMenu}
          />
        )}
        <S.NoteBlockDragItem $image={dragHandleIcon} onClick={this.handleOpenSelectMenu} />
        {this.state.tag !== "img" && (
          <S.NoteBlockTextItem
            innerRef={this.contentEditable}
            data-block-id={this.props.id}
            html={this.state.html}
            tagName={this.state.tag}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
            disabled={this.props.isSharedPage}
          />
        )}
        {this.state.tag === "img" && (
          <S.NoteBlockImageItem
            data-block-id={this.props.id}
            data-tag={this.state.tag}
            ref={this.contentEditable}
          >
            <input
              id={`${this.props.id}_fileInput`}
              name={this.state.tag}
              type="file"
              accept="image/*"
              onChange={this.handleImageUpload}
              ref={(ref) => (this.fileInput = ref)}
              hidden
            />
            {!this.state.imageURL && (
              <label htmlFor={`${this.props.id}_fileInput`}>
                이미지가 선택되지 않았습니다. 선택해주세요.
              </label>
            )}
            {this.state.imageURL && (
              <img src={`${import.meta.env.VITE_SERVER_URL}` + this.state.imageURL} />
            )}
          </S.NoteBlockImageItem>
        )}
      </S.NoteBlockLayout>
    );
  }
}

export default NoteBlock;

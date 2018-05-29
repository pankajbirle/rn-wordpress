import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form, List, ListItem } from "native-base";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { uploadFile } from "../../../actions/Upload";
import styles from '../../../assets/styles';

class UploadScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Attachment: [],
            AttachmentTemp: [],
        }
    }

    /**
    * @method pickAttachment
    * @description function to pic documents
    */
    pickAttachment = () =>  () => {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
        }, (err, res) => {
            if (res) {
                let invalidFile = false;
                let fileType = res.type;
                let name = res.fileName;
                let size = res.fileSize;
                if (size <= 5242880 && (fileType.includes('image') || fileType.includes('pdf') || name.includes('.doc') || name.includes('.docx'))) {
                    this.props.uploadFile(res, (response) => {
                        if (response != 'error') {
                            let uploadedFiles = JSON.parse(response.data);
                            let path = this.state.Attachment;
                            let pathTemp = this.state.AttachmentTemp;
                            path.push(uploadedFiles[0]);
                            let fileName = res.fileName;
                            pathTemp.push(fileName);
                            fileName = fileName.toString();
                            this.setState({ Attachment: path, AttachmentTemp: pathTemp });

                            alert('File has been uploaded successfully.')
                        } else {
                            alert('Error in file uploading.');
                        }
                    });
                } else {
                    invalidFile = true;
                    alert('Please upload only images, .doc and .pdf files with size equal to or less than 5MB.');
                }
            }
        })
    }

    /**
    * @method renderAttachments
    * @description function to render attachments
    */
    renderAttachments() {
        if (this.state.Attachment.length > 0) {
            return (
                this.state.Attachment.map((val, i) => {
                    let ext = this.getExtension(val);
                    return (
                        <ListItem key={i}>
                            <Text style={{ textDecorationLine: 'underline', color: 'blue' }}
                                onPress={this.download(val)}>{ext}</Text>
                            <Icon name="md-remove-circle" onPress={this.removeAttachment(i)}
                                style={{ color: "red", padding: 3 }} />
                        </ListItem>
                    )
                })
            )
        }
    }

    /**
    * @method removeAttachment
    * @description function to remove attachment
    */
    removeAttachment = (index) => () => {
        let allFileTemp = [];
        let allFileTemp2 = [];

        allFileTemp.splice(index);
        _.map(this.state.Attachment, (val, i) => {
            if (i != index) {
                allFileTemp.push(val)
            }
        })

        allFileTemp2.splice(index);
        _.map(this.state.AttachmentTemp, (val, i) => {
            if (i != index) {
                allFileTemp2.push(val)
            }
        })
        this.setState({ Attachment: allFileTemp, AttachmentTemp: allFileTemp2 });
    }

    /**
    * @method getExtension
    * @description function to get Extension of the file
    */
    getExtension(url) {
        let ext;
        if (url.includes("png")) {
            ext = "PNG";
        } else if (url.includes("jpeg")) {
            ext = "JPEG";
        } else if (url.includes("jpg")) {
            ext = "JPG";
        } else if (url.includes("doc")) {
            ext = "DOC";
        } else if (url.includes("docx")) {
            ext = "DOCX";
        } else if (url.includes("pdf")) {
            ext = "PDF";
        }
        return ext;
    }

    /**
    * @method download
    * @description function to download the file
    */
    download = (url) => () => {
        if (url != undefined || url != '') {
            var date = new Date();
            var ext;
            if (url.includes("png")) {
                ext = ".png";
            } else if (url.includes("jpeg")) {
                ext = ".jpeg";
            } else if (url.includes("jpg")) {
                ext = ".jpg";
            } else if (url.includes("doc")) {
                ext = ".doc";
            } else if (url.includes("docx")) {
                ext = ".docx";
            } else if (url.includes("pdf")) {
                ext = ".pdf";
            }

            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: PictureDir + "/Sample_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
                    description: 'Sample'
                }
            }
            config(options).fetch('GET', url).then((res) => {
                alert("File downloaded successfully!");
            });
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left style={styles.flexOne}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('DrawerOpen')}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body style={styles.homeBody}>
                        <Title>Header</Title>
                    </Body>
                    <Right style={styles.flexOne} />
                </Header>
                <Content>
                    <View style={styles.container}>
                        <View style={styles.textWrap}>
                            <Button onPress={this.pickAttachment()}>
                                <Text style={styles.buttonText}> UPLOAD </Text>
                            </Button>
                        </View>
                        <View>
                            <List style={{ paddingLeft: 10 }}>
                                {this.renderAttachments()}
                            </List>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

export default connect(null, {
    uploadFile
})(UploadScreen);

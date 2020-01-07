/* eslint-disable react-native/no-inline-styles */
import React, {memo, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Formik, Field} from 'formik';
import {connect} from 'react-redux';
import {action} from '../../utils';
import {format} from 'date-fns';
import FastImage from 'react-native-fast-image';
import TextInput from '../../components/textInput/TextInput';
import * as types from '../../constants/actionTypes';
import Button from '../../components/button/Button';
import Text from '../../components/text/Text';
import RatingBar from '../../components/ratingBar/RatingBar';
import Loading from '../../components/loading/Loading';
import {openLink, formatData, formatNumberWithComma, OS} from '../../utils';
import commonStyle from '../../commonStyle';
import styles from './styles';
import FILE from '../../assets/icons/file.svg';
import DOWNLOAD from '../../assets/icons/file_download.svg';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {ScrollView} from 'react-native-gesture-handler';

const DealDetail = ({
  loading,
  navigation: {getParam},
  dealDetail,
  dealFile,
  dealDetailSuccess,
  dealFilesSuccess,
  dealFilesUploadSuccess,
  navigation: {navigate},
}) => {
  const data = [
    {
      text:
        '8/30 Buyer is still actively looking - just placed an offer on a home - waiting to hear back.',
    },
    {text: ' 9/1  Buyer will be in town next week to begin home search'},
    {
      text: '8/20 Made contact with buyer setting up with agent',
    },
    {
      text: '8/20 Made contact with buyer setting up with agent',
    },
    {
      text:
        '8/30 Buyer is still actively looking - just placed an offer on a home - waiting to hear back.',
    },
    {text: ' 9/1  Buyer will be in town next week to begin home search'},
    {
      text: '8/20 Made contact with buyer setting up with agent',
    },
    {
      text: '8/20 Made contact with buyer setting up with agent',
    },
  ];
  const ID = getParam('ID');
  const [showLoading, setShowLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  let timer = setTimeout(() => setShowLoading(false), 5000);
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [showLoading, timer]);
  useEffect(() => {
    if (ID !== undefined && ID !== null) {
      dealDetailSuccess(ID);
      //'0063D000008obAhQAI'
      dealFilesSuccess(ID);
    }
  }, [ID, dealDetailSuccess, dealFilesSuccess]);
  if (loading || showLoading) {
    return <Loading />;
  }
  const documentPicker = async dealID => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
          DocumentPicker.types.plainText,
        ],
      });
      if (res && res.size <= 5242880) {
        let path = res.uri;
        if (OS === 'ios') {
          const split = path.split('/');
          const name = split.pop();
          const inbox = split.pop();
          path = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
        }
        RNFS.readFile(path, 'base64')
          .then(fileData => {
            const values = {
              DEAL_ID: dealID,
              FILE_DATA: fileData,
              FILE_TYPE: res.type,
              FILE_NAME: res.name,
            };
            setShowLoading(true);
            setErrorMsg(null);
            dealFilesUploadSuccess(values);
          })
          .catch(err => {
            setErrorMsg(err.message);
          });
      } else {
        setShowLoading(false);
        setErrorMsg('Your file size exceeded more than 5 MB.');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const renderLine = () => {
    return (
      <View
        style={{
          borderBottomColor: '#d7d7d7',
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginVertical: 10,
        }}
      />
    );
  };

  const renderText = (title, titleValue) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginVertical: 5,
        }}>
        {title && (
          <Text
            variant="subtitle2"
            style={{
              fontSize: 16,
              lineHeight: 20,
              color: '#333',
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
        )}
        {titleValue && (
          <Text
            variant="subtitle2"
            style={{
              fontSize: 14,
              lineHeight: 20,
              marginHorizontal: 5,
              color: '#808080',
              fontWeight: '500',
            }}>
            {titleValue}
          </Text>
        )}
      </View>
    );
  };
  const renderProfile = (
    heading,
    subHeading,
    PREAPPROVAL_AMOUNT,
    LOAN_TYPE,
    FIRST_TIME_HOME_BUYER,
    TIME_FRAME_FOR_PURCHASING,
    LOCATION_FOR_HOME_SEARCH,
    PROPERTY_TYPE,
    PROPERTY_DETAILS,
  ) => {
    return (
      <View
        style={[
          styles.card,
          commonStyle.hMar10,
          commonStyle.pad10,
          commonStyle.vMar10,
        ]}>
        {heading && (
          <Text
            variant="subtitle2"
            style={{
              fontSize: 16,
              lineHeight: 20,
              color: '#333',
              fontWeight: 'bold',
            }}>
            {heading}
          </Text>
        )}
        {renderLine()}
        {subHeading && (
          <Text
            variant="subtitle2"
            style={{
              fontSize: 16,
              lineHeight: 20,
              color: '#333',
              fontWeight: '500',
              marginVertical: 5,
            }}>
            {subHeading}
          </Text>
        )}
        {renderText('Pre-approval Amount:', PREAPPROVAL_AMOUNT)}
        {renderText('Loan Type:', LOAN_TYPE)}
        {renderText('First Time Home Buyer:', FIRST_TIME_HOME_BUYER)}
        {renderText('Time Frame for Purchasing:', TIME_FRAME_FOR_PURCHASING)}
        {renderText('Location for Home Search:', LOCATION_FOR_HOME_SEARCH)}
        {renderText('Property Type:', PROPERTY_TYPE)}
        {renderText('Property Details:', PROPERTY_DETAILS)}
      </View>
    );
  };
  const renderActivity = (
    heading,
    DAYS_LOOKING,
    LAST_OFFER_DATE,
    DATE_LEAD_RECEIVED,
  ) => {
    return (
      <View
        style={[
          styles.card,
          commonStyle.hMar10,
          commonStyle.pad10,
          commonStyle.vMar10,
        ]}>
        {heading && (
          <Text
            variant="subtitle2"
            style={{
              fontSize: 16,
              lineHeight: 20,
              color: '#333',
              fontWeight: 'bold',
            }}>
            {heading}
          </Text>
        )}
        {renderLine()}
        {renderText('Date Lead Received:', DAYS_LOOKING)}
        {renderText('Last Offer Date:', LAST_OFFER_DATE)}
        {renderText('Days Looking:', DATE_LEAD_RECEIVED)}
      </View>
    );
  };
  const renderAgentRequestDetails = (
    heading,
    DATA_AGENT_REQUESTED,
    DATA_PAIRED_WITH_AGENT,
    PROPERTY_OF_INTEREST,
    BORROWER_NOTE,
  ) => {
    return (
      <View
        style={[
          styles.card,
          commonStyle.hMar10,
          commonStyle.pad10,
          commonStyle.vMar10,
        ]}>
        {heading && (
          <Text
            variant="subtitle2"
            style={{
              fontSize: 16,
              lineHeight: 20,
              color: '#333',
              fontWeight: 'bold',
            }}>
            {heading}
          </Text>
        )}
        {renderLine()}
        {renderText('Data agent requested:', DATA_AGENT_REQUESTED)}
        {renderText('Data paired with agent:', DATA_PAIRED_WITH_AGENT)}
        {renderText('Property of interest:', PROPERTY_OF_INTEREST)}
        {renderText('Borrower noter:', BORROWER_NOTE)}
      </View>
    );
  };
  const renderNotes = (heading, NOTES) => {
    return (
      <View
        style={[
          styles.card,
          commonStyle.hMar10,
          commonStyle.pad10,
          commonStyle.vMar10,
        ]}>
        {heading && (
          <Text
            variant="subtitle2"
            style={{
              fontSize: 16,
              lineHeight: 20,
              color: '#333',
              fontWeight: 'bold',
            }}>
            {heading}
          </Text>
        )}
        {renderLine()}
        {renderText(null, NOTES)}
      </View>
    );
  };
  const renderDetails = (IMAGE, NAME, PHONE, EMAIL, RATING, ID_DETAIL) => {
    return (
      <View style={{flexDirection: 'row', marginVertical: 10}}>
        {IMAGE && (
          <TouchableOpacity
            onPress={() => {
              navigate('Profile', {ID: ID_DETAIL});
            }}>
            <FastImage
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginHorizontal: 10,
                resizeMode: 'contain',
              }}
              source={{uri: IMAGE, priority: FastImage.priority.high}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        )}
        <View style={{flex: 1, flexWrap: 'wrap', justifyContent: 'center'}}>
          <View style={{}}>
            {NAME !== null && (
              <Text
                variant="subtitle2"
                style={{
                  fontSize: 16,
                  lineHeight: 20,
                  marginVertical: 5,
                  color: '#333',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}
                onPress={() => {
                  navigate('Profile', {ID: ID_DETAIL});
                }}>
                {formatData(NAME)}
              </Text>
            )}
            {Number(RATING) !== 0 && (
              <RatingBar minRating={Number(Math.ceil(RATING))} />
            )}
            {PHONE !== null && (
              <Text
                variant="subtitle2"
                style={{
                  fontSize: 15,
                  lineHeight: 20,
                  marginVertical: 5,
                  textDecorationLine: 'underline',
                }}
                onPress={() => openLink(`tel:${formatData(PHONE)}`)}>
                {formatData(PHONE)}
              </Text>
            )}
            {EMAIL !== null && (
              <Text
                variant="subtitle2"
                style={{
                  fontSize: 14,
                  lineHeight: 20,
                  color: '#337ab7',
                  textDecorationLine: 'underline',
                }}
                onPress={() => openLink(`mailto:${formatData(EMAIL)}`)}>
                {formatData(EMAIL)}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };
  const renderButton = () => {
    return (
      <Button
        viewStyle={{
          backgroundColor: '#000',
          borderRadius: 5,
        }}
        title="Upload"
        textStyle={{color: '#fff', fontSize: 12}}
        onPress={() => {
          if (ID !== undefined && ID !== null) {
            documentPicker(ID);
          }
        }}
      />
    );
  };
  const renderAttachmentDetails = (index, UPLOAD_TIME, OWNER, NAME, URL) => {
    return (
      <View
        key={index}
        style={{
          flex: 1,
          flexWrap: 'wrap',
          marginVertical: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          <FILE width={20} height={20} color={'#22527c'} />
          {URL && (
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                flexWrap: 'wrap',
              }}>
              <Text
                variant="subtitle2"
                style={{
                  fontSize: 16,
                  lineHeight: 20,
                  color: '#337ab7',
                  fontWeight: '500',
                  textDecorationLine: 'underline',
                }}
                onPress={() => openLink(URL)}>
                {NAME}
              </Text>
            </View>
          )}
          <DOWNLOAD width={20} height={20} color={'#000'} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginLeft: 2,
          }}>
          {OWNER && (
            <Text
              variant="subtitle2"
              style={{
                fontSize: 12,
                lineHeight: 20,
                color: '#808080',
                marginRight: 5,
                fontWeight: '300',
              }}>
              {`Uploaded by ${OWNER}`}
            </Text>
          )}
          {UPLOAD_TIME && (
            <Text
              variant="subtitle2"
              style={{
                fontSize: 12,
                lineHeight: 20,
                color: '#808080',
                fontWeight: '300',
              }}>
              {format(new Date(UPLOAD_TIME), 'd LLL, yyyy')}
            </Text>
          )}
        </View>
      </View>
    );
  };
  const renderAttachment = heading => {
    const {ATTACHMENTS} = dealFile;
    return (
      <View
        style={[
          styles.card,
          commonStyle.hMar10,
          commonStyle.pad10,
          commonStyle.vMar10,
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {heading && (
            <Text
              variant="subtitle2"
              style={{
                fontSize: 16,
                lineHeight: 20,
                textAlign: 'left',
                color: '#333',
                fontWeight: 'bold',
              }}>
              {heading}
            </Text>
          )}
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {renderButton()}
          </View>
        </View>
        {renderLine()}
        {errorMsg !== null && (
          <Text
            variant="error"
            style={{
              fontSize: 16,
              lineHeight: 20,
              marginVertical: 10,
            }}>
            {errorMsg}
          </Text>
        )}
        {ATTACHMENTS === undefined ||
        ATTACHMENTS === null ||
        ATTACHMENTS.length === 0 ? (
          <Text
            variant="subtitle2"
            style={{
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'left',
              color: '#333',
            }}>
            {'There is no attachments available.'}
          </Text>
        ) : (
          ATTACHMENTS &&
          ATTACHMENTS.map((item, index) => {
            return renderAttachmentDetails(
              index,
              formatData(item.UPLOAD_TIME),
              formatData(item.OWNER),
              formatData(item.NAME),
              formatData(item.URL),
            );
          })
        )}
      </View>
    );
  };
  const renderChatter = dealID => {
    return (
      <Button
        viewStyle={{
          backgroundColor: '#0e52fd',
          borderRadius: 5,
          marginHorizontal: 10,
          marginTop: 10,
          marginBottom: 30,
        }}
        title="Chat"
        textStyle={{color: '#fff', fontSize: 14}}
        onPress={() => {
          navigate('ChatMsg', {ID: dealID});
        }}
      />
    );
  };
  const keyExtractor = (item, index) => `${item}-${index}`;
  const renderItem = ({item}) => {
    return (
      <>
        <View
          style={[
            styles.card,
            commonStyle.hMar10,
            commonStyle.pad10,
            commonStyle.vMar10,
          ]}>
          {renderDetails(
            formatData(item.LO_IMAGE),
            formatData(item.LO_NAME),
            formatData(item.LO_PHONE),
            formatData(item.LO_EMAIL),
            formatData(item.LO_RATING),
            item.LO_ID,
          )}
          {renderDetails(
            formatData(item.AGENT_IMAGE),
            formatData(item.AGENT_NAME),
            formatData(item.AGENT_PHONE),
            formatData(item.AGENT_EMAIL),
            formatData(item.AGENT_RATING),
            item.AGENT_ID,
          )}
          {renderDetails(
            formatData(item.BROKER_IMAGE),
            formatData(item.BROKER_NAME),
            formatData(item.BROKER_PHONE),
            formatData(item.BROKER_EMAIL),
            formatData(item.BROKER_RATING),
            item.BROKER_ID,
          )}
        </View>
        {/* {renderDetails(null, DEAL_NAME, DEAL_PHONE, DEAL_EMAIL, null)} */}
        {item.PROFILE &&
          renderProfile(
            'Profile',
            'Loan Basis',
            formatNumberWithComma(item.PROFILE.PREAPPROVAL_AMOUNT),
            formatData(item.PROFILE.LOAN_TYPE),
            formatData(item.PROFILE.FIRST_TIME_HOME_BUYER),
            formatData(item.PROFILE.TIME_FRAME_FOR_PURCHASING),
            formatData(item.PROFILE.LOCATION_FOR_HOME_SEARCH),
            formatData(item.PROFILE.PROPERTY_TYPE),
            formatData(item.PROFILE.PROPERTY_DETAILS),
          )}
        {item.ACTIVITY &&
          renderActivity(
            'Activity',
            formatData(item.ACTIVITY.DATE_LEAD_RECEIVED),
            formatData(item.ACTIVITY.LAST_OFFER_DATE),
            formatData(item.ACTIVITY.DAYS_LOOKING),
          )}
        {item.AGENT_REQUEST_DETAILS !== undefined &&
          renderAgentRequestDetails(
            'Agent Request Details',
            formatData(item.AGENT_REQUEST_DETAILS.DATA_AGENT_REQUESTED),
            formatData(item.AGENT_REQUEST_DETAILS.DATA_PAIRED_WITH_AGENT),
            formatData(item.AGENT_REQUEST_DETAILS.PROPERTY_OF_INTEREST),
            formatData(item.AGENT_REQUEST_DETAILS.BORROWER_NOTE),
          )}
        {renderNotes('Notes', formatData(item.NOTES))}
        {renderAttachment('Attachment')}
        {renderChatter(item.DEAL_ID)}
      </>
    );
  };
  const renderFlatList = () => {
    return (
      <FlatList
        data={[dealDetail]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  return <View style={{flex: 1}}>{renderFlatList()}</View>;
};

const mapStateToProps = state => ({
  loading:
    !!state.loading[`${types.DEAL_DETAIL}`] ||
    !!state.loading[`${types.DEAL_FILES}`],
  error:
    state.error[`${types.DEAL_DETAIL}`] || state.error[`${types.DEAL_FILES}`],
  dealDetail: state.dealDetail,
  dealFile: state.dealFile,
});

const mapDispatchToProps = dispatch => {
  return {
    dealDetailSuccess: values =>
      dispatch(action(`${types.DEAL_DETAIL}_${types.REQUEST}`, values)),
    dealFilesSuccess: values =>
      dispatch(action(`${types.DEAL_FILES}_${types.REQUEST}`, values)),
    dealFilesUploadSuccess: values =>
      dispatch(action(`${types.DEAL_FILES_POST}_${types.REQUEST}`, values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(DealDetail));

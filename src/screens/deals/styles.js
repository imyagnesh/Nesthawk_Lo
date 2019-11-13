import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 10,
    height: 40,
  },
  textStyle: { textAlign: 'center', textTransform: 'uppercase' },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#e9e9e9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  mTopStyle: { marginTop: 10 },
  headerItem: {
    minHeight: 30,
    backgroundColor: '#efefef',
    borderRightWidth: 1,
    borderRightColor: '#dfdfdf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;

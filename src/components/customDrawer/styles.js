import {StyleSheet} from 'react-native';
import {OS} from '../../utils';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    borderRadius: 50,
  },
  profileTextContainer: {
    marginLeft: 10,
    marginTop: OS === 'android' ? 10 : 0,
    marginBottom: 20,
  },
  profileText: {
    marginVertical: 5,
  },
  lineStyle: {
    borderBottomColor: '#A2A2A2',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  menuIconStyle: {marginHorizontal: 10},
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    marginLeft: 5,
  },
  footerTextStyle: {
    textAlign: 'center',
  },
  footerIconStyle: {marginRight: 10},
});

export default styles;

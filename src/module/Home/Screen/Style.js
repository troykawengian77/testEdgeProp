import { StyleSheet } from "react-native";
import Color from "../../../config/Color";
import Size from "../../../config/Size";

export default StyleSheet.create({
  header: {

  },
  headerBg: {
    height: Size.screen.width * 0.8,
    width: Size.screen.width
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Size.screen.width * 0.1,
    flexDirection: 'row',
  },
  titleText: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 24,
    backgroundColor: Color.whiteTransparent,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row1Icon: {
    height: 100,
    width: 100,
  },
  row1Text: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 40,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftText: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 5,
  },
  descText: {
    textAlign: 'center',
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  containerList: {
    marginTop: -30,
    minHeight: Size.screen.height * 0.9,
    backgroundColor: Color.grey,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  content: {
    padding: 20
  },
  contentTitle: {
    color: Color.black,
    fontWeight: 'bold',
    fontSize: 20,
  },
  box: {
    marginVertical: 10
  },
  accordion: {
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    backgroundColor: Color.white,
    shadowOffset: {
      width: 0.15,
      height: 0.15,
    },
    shadowOpacity: 0.075,
    shadowRadius: 5,
    elevation: 3,
    padding: 10,
    paddingVertical: 20
  },
  accordionHeader: {
    flexDirection: 'row'
  },
  accordionHeaderLeft: {
    flexDirection: 'row',
    width: '60%',
    alignItems: 'center'
  },
  accordionHeaderRight: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center'
  },
  accordionHeaderTitle: {
    color: Color.black,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  accordionHeaderDesc: {
    color: Color.darkGrey,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center'
  },
  accordionLabelRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  accordionBody: {
    marginTop: 10,
    borderTopColor: Color.darkGrey,
    borderTopWidth: 0.8,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
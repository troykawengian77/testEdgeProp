import React from 'react';
import {
    View,
    Platform,
    Text,
    Image,
    TouchableOpacity,
    TextInput, StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = (props) => {
    return (
        <View>
            <View style={styles.containerHeader}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={styles.containerLeftLogo}
                            onPress={props.onPressLeft}
                        >
                            <Icon color={'#fff'} name={'chevron-left'} size={30} />
                        </TouchableOpacity>
                        <Text style={styles.textHeader}>{props.title}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerHeader: {
        width: '100%',
        height: 50,
        backgroundColor: '#737BC6',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    textHeader: {
        color: '#fff',
        marginTop: 15,
        left: 20,
        fontSize: 16,
    },
    containerLeftLogo: {
        marginTop: 10,
        left: 10,
        fontSize: 16,
        letterSpacing: 3,
    }
})

export default Header

// export default class HeaderBack extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       search: false,
//     };
//   }

//   _onPressSearch = () => {
//     const newSearchState = !this.state.search;
//     this.setState({search: newSearchState});
//   };

//   render() {
//     const HeaderStyle =
//       Platform.OS === 'android' ? Style.header_android : Style.header_ios;
//     const TextHeaderStyle =
//       Platform.OS === 'android'
//         ? Style.text_header_android
//         : Style.text_header_ios;
//     const LeftLogoStyle =
//       Platform.OS === 'android' ? Style.left_logo_android : Style.left_logo_ios;
//     const SearchLogoStyle =
//       Platform.OS === 'android'
//         ? Style.search_logo_android
//         : Style.search_logo_ios;
//     const RightLogoStyle =
//       Platform.OS === 'android'
//         ? Style.right_logo_android
//         : Style.right_logo_ios;
//     const TextInputStyle =
//       Platform.OS === 'android' ? Style.textinput_android : Style.textinput_ios;
//     const {search} = this.state;
//     const newSearch = search ? (
//       <View style={Style.container_search}>
//         <View style={TextInputStyle}>
//           <TouchableOpacity>
//             <SearchBlue width={20} height={20} />
//           </TouchableOpacity>
//           <TextInput placeholder="Search" style={Style.textinput} />
//         </View>
//       </View>
//     ) : (
//       <Text style={TextHeaderStyle}>{this.props.title}</Text>
//     );
//     return (
//       <View>
//         <View style={HeaderStyle}>
//           <View style={Style.header}>
//             <View style={{flexDirection: 'row'}}>
//               <TouchableOpacity
//                 style={Style.container_left_logo}
//                 onPress={this.props.onPressLeft}>
//                 <Image
//                   source={this.props.leftLogo}
//                   resizeMode={'cover'}
//                   style={LeftLogoStyle}
//                 />
//               </TouchableOpacity>
//               <Text style={TextHeaderStyle}>{this.props.title}</Text>
//             </View>
//             <View>{this.props?.rightComponent}</View>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

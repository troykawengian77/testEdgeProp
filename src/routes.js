import React from 'react'
import { Router, Scene, Drawer, Tabs, ActionConst } from 'react-native-router-flux'
import CustomTabbar from './lib/components/CustomTabbar'
import { width, height } from './lib/utils'
import CharacterPage from './page/character'

const Routes = () => (
    <Router>
        <Scene hideNavBar key="root">
            <Drawer
                hideNavBar
                key="drawer"
                onExit={() => {
                    console.log('Drawer closed');
                    // this.fetchData()
                }}
                onEnter={() => {
                    console.log('Drawer opened');
                }}
                drawerWidth={width * 0.9}
                tabBarComponent={CustomTabbar}
            >
                <Tabs
                    key="navTab"
                    routeName="tabbar"
                    tabBarPosition="bottom"
                    swipeEnabled
                    lazy={true}
                    tabBarStyle={{
                        backgroundColor: '#fff',
                        // height: height * 0.08,
                        borderRadius: 30,
                        marginBottom: 10,
                        width: width * 0.9,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        height: height * 0.09,
                        position: "absolute",
                        border: 'none',
                    }}
                    activeTintColor="#000"
                    inactiveTintColor="#000"
                    type={ActionConst.RESET}
                    hideNavBar
                >
                    <Scene key="characterList" title="Character List" >
                        <Scene key="characterList" component={CharacterPage} hideNavBar={true} init />
                    </Scene>
                    <Scene key="characterList" title="Character List" >
                        <Scene key="characterList" component={CharacterPage} hideNavBar={true} init />
                    </Scene>
                </Tabs>
            </Drawer>
        </Scene>
    </Router>
)
export default Routes
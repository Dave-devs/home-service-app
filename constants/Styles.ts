import { StyleSheet } from 'react-native';
import Colors from './Colors';

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 10,
        paddingVertical: 20,
        paddingTop: 60,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    btnStyle: {
        backgroundColor: Colors.primary,
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 99,
        marginVertical: 20,
    },
    btnText: {
        color: Colors.white,
    },
    socialBtnContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        gap: 20, 
        alignItems: 'center', 
        paddingHorizontal: 20, 
        paddingVertical: 20,
    },
})
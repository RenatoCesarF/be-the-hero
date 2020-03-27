import React from 'react';
import { useNavigation, useRoute} from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import { View, Text,TouchableOpacity, Image, Linking  } from 'react-native';
import logoImg from '../../assets/logo.png';
import * as MailComposer from 'expo-mail-composer'
import styles from './styles'

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const menssage = `Olá ${incident.name}, estou entrando em contado pois gostaria de ajudar no caso
         "${incident.title}". Com o valor de R$${incident.value},00`

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do Caso: ${incident.title}`,
            recipients: [incident.email],
            body: menssage,
        });
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${menssage}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                
                <TouchableOpacity onPress={navigateBack}> 
                    <Feather name="arrow-left" size={28} color="#E82041"/>    
                </TouchableOpacity>
            </View>
            <View style={styles.incident}> 
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG: </Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/
                    {incident.uf}
                </Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.description} </Text>

                <Text style={styles.incidentProperty}>VALOR: </Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                    .format(incident.value)}
                </Text>

            </View >
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o Herói desse caso.</Text>
            
                <Text style={styles.heroDescription}>Entre em contato: </Text>

                <View style={styles.action}>
                     
                    <TouchableOpacity style={styles.actions} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actions} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </View>
        
    );
}
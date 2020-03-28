import React from "react";
import { View, TouchableOpacity, Image, Text, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import * as MailComposer from "expo-mail-composer";

import { Feather } from "@expo/vector-icons";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

const Detail = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { incident } = route.params;
  const message =
    `Hello ${incident.name}, im getting in touch, because i'll help with the incident '${incident.title}' with the amount of ${Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(incident.value)}`;

  const screenPop = () => {
    navigation.goBack();
  };

  const sendMail = () => {
    MailComposer.composeAsync({
      subject: `Hero of the incident: ${incident.title}`,
      recipients: [incident.emai],
      body: message
    });
  };

  const sendWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={screenPop}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>

        <Image source={logoImg} />
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, {marginTop: 0}]}>NGO:</Text>
  <Text style={styles.incidentValue}>{incident.name} at {incident.city}/{incident.uf}</Text>

        <Text style={styles.incidentProperty}>Incident:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>Amount:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the hero for this incident</Text>

        <Text style={styles.heroDescription}>Get in touch:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Detail;

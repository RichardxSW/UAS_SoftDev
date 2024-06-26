import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from '../assets/Background.png';
import { FontAwesome } from 'react-native-vector-icons';
import shows from '../assets/data/showdata.js';

const ShowList = () => {
  const navigation = useNavigation();
  const [selectedShow, setSelectedShow] = useState(null);

  const handleShowPress = (show) => {
    setSelectedShow(show);
  };

  const closeModal = () => {
    setSelectedShow(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.content}>
            <Text style={styles.subtitle}>Tap the mini profile to see show details</Text>
            <View style={styles.gridContainer}>
              {shows.map((show) => (
                <TouchableOpacity key={show.id} style={styles.showContainer} onPress={() => handleShowPress(show)} activeOpacity={0.8}>
                  <ImageBackground source={show.image} style={styles.showImage}>
                    <View style={styles.darkness}>
                      <Text style={styles.showName}>{show.name}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>

            {/* Modal for show details */}
            <Modal
              animationType="easeandout"
              transparent={true}
              visible={selectedShow !== null}
              onRequestClose={closeModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Pressable onPress={closeModal} style={styles.closeButton}>
                    <FontAwesome name="close" size={20} color="#8b0000" />
                  </Pressable>
                  <Text style={styles.modalTitle}>{selectedShow?.name}</Text>
                  <View style={styles.imageContainer}>
                    <Image source={selectedShow?.image} style={styles.modalImage} />
                    <Text style={styles.overlayText}>SeaBrew</Text>
                  </View>
                  <Text style={styles.modalDescription}>{selectedShow?.description}</Text>
                  <View style={styles.location}>
                    <FontAwesome name="map" size={24} color="black" />
                    <Text style={{ fontSize: 16, marginLeft: 10, fontFamily: 'MontserratSemiBold' }}>Location: {selectedShow?.location}</Text>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ImageBackground>
      </ScrollView>
      <TouchableOpacity style={styles.ticketButton} onPress={() => navigation.navigate('Ticket')}>
        <FontAwesome name="ticket" size={24} marginRight={10} color="white" />
        <Text style={styles.ticketButtonText}>Buy Ticket</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  subtitle: {
    fontFamily: 'MontserratMedium',
    fontSize: 15,
    margin: 14,
    textAlign: 'center',
    color: 'black',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 80, // Add padding to accommodate the fixed button
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  showContainer: {
    width: '48%',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    alignItems: 'center',
  },
  showImage: {
    width: '100%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkness: {
    backgroundColor: 'rgba(0,0,0,0.27)',
    width: '100%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showName: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 13,
    color: 'white',
    width: '80%',
    textAlign: 'center',
    opacity: 1.1,
  },
  ticketButton: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 25,
    width: '50%',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#375A82',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ticketButtonText: {
    fontFamily: 'MontserratSemiBold',
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 20,
    width: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 7,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'MontserratBold',
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 15,
    textAlign: 'left',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  overlayText: {
    position: 'absolute',
    top: 0,
    left: 0,
    color: '#B3E0F5',
    fontFamily: 'BigShouldersStencilBold',
    fontSize: 18,
    padding: 8,
  },
  modalDescription: {
    fontSize: 13,
    textAlign: 'center',
    margin: 15,
    fontFamily: 'MontserratMedium',
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
});

export default ShowList;
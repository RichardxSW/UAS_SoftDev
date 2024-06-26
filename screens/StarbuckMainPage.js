import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView,
  TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Data from '../assets/data/sbuckdata.js';
import CurrencyInput from 'react-native-currency-input';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const StarbuckMainPage = () => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('All');
  const handleBlur = () => {
    setIsFocused(false);
    // Optional: Dismiss keyboard when input is blurred
    Keyboard.dismiss();
    };

    const hasDiscount = (item) => {
      return item.disc === true; // Check the 'disc' property instead of comparing 'originalPrice' and 'price'
    };

const filteredData = Data.filter(item => {
  if (inputValue) {
    // Jika ada nilai di kolom pencarian
    if (category === 'All' || category === '') {
      // Jika kategori adalah 'All', periksa semua item
      return item.name.toLowerCase().includes(inputValue.toLowerCase());
    } else {
      // Jika kategori tertentu dipilih, periksa nama item dan kategori
      return (
        item.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        (
          (category === 'Coffee' && item.id <= 4) ||
          (category === 'Non Coffee' && item.id >= 5 && item.id <= 8) ||
          (category === 'Food' && item.id >= 9)
        )
      );
    }
  } else {
    // Jika tidak ada nilai di kolom pencarian
    if (category === 'All' || category === '') return true; // Menambahkan kategori kosong sebagai "All"
    if (category === 'Coffee' && item.id <= 4) return true;
    if (category === 'Non Coffee' && item.id >= 5 && item.id <= 8) return true;
    if (category === 'Food' && item.id >= 9) return true;
  }
  return false;
});

return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
        <View style={styles.wallpaperContainer} />
        {/* <View style={styles.inputContainer}> */}
                {/* {!isFocused && !inputValue && (
                    <Text style={styles.placeholder}>
                        Search what do you want..
                    </Text>
                )} */}
                <View style={styles.searchBarContainer}>
          <FontAwesome name="search" size={20} color="#dddddd" style={styles.searchIcon} />
          <TextInput 
            placeholder='Search what do you want..'
            style={styles.searchBar}
            placeholderTextColor='#dddddd'
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            onChangeText={text => setInputValue(text)}
            value={inputValue}
          />
        </View>
            {/* </View> */}
            
        {/* <Text style={styles.headerText}>SeaBrew's Coffee</Text> */}

        <View style={styles.bannerContainer}>
          {Data.find(item => item.disc == true) && (
            <TouchableOpacity
              onPress={() => navigation.navigate('StarbuckDetail', { item: Data.find(item => item.disc === true) })}
            >
              <Image
                source={ Data.find(item => item.disc === true).image } // Dynamic image source based on data item
                style={styles.bannerImage}
                resizeMode="cover"
              />
              <Text style={styles.bannerText}>30% OFF</Text>
            </TouchableOpacity>
          )}
        </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => setCategory('All')}>
          <Text style={category === 'All' ? styles.categoryTextActive : styles.categoryText}>For You</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Coffee')}>
          <Text style={category === 'Coffee' ? styles.categoryTextActive : styles.categoryText}>Coffee</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Non Coffee')}>
          <Text style={category === 'Non Coffee' ? styles.categoryTextActive : styles.categoryText}>Non Coffee</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => setCategory('Food')}>
          <Text style={category === 'Food' ? styles.categoryTextActive : styles.categoryText}>Food</Text>
        </TouchableOpacity> */}
      </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          {filteredData.map(item => (
            <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => navigation.navigate('StarbuckDetail' , {item})}>
              <Image source={item.image} style={styles.image} resizeMode="cover" />
              <Text style={styles.itemName}>{item.name}</Text>
              {hasDiscount(item) ? (
                <>
                  <Text style={[styles.itemPriceOriginal, styles.strikethrough]}>
                    IDR {item.price.toLocaleString()}
                  </Text>
                  <CurrencyInput
                    style={styles.itemPrice}
                    value={item.price - item.price * 0.3} // Assuming a 10% discount
                    prefix="IDR "
                    delimiter="."
                    separator=","
                    precision={0}
                    editable={false}
                  />
                </>
              ) : (
                <CurrencyInput
                  style={styles.itemPrice}
                  value={item.price}
                  prefix="IDR "
                  delimiter="."
                  separator=","
                  precision={0}
                  editable={false}
                />
              )}
              <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('StarbuckDetail' , {item})}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 80,
    // marginTop: 20,
    marginBottom: 10,
  },
  wallpaperContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#ABE4FC',
    zIndex: -5,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#375A82',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    height: 50,
    color: 'white',
    fontFamily: 'Montserrat',
  },
  headerText: {
    fontSize: 24,
    marginVertical: 10,
    fontFamily: 'MontserratBold',
    textAlign: 'center',
  },
  bannerContainer: {
    position: 'relative',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  bannerText: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 14,
    color: '#fff',
    zIndex: 1,
    backgroundColor: '#ED5151',
    padding: 8,
    borderRadius: 16,
    fontFamily: 'MontserratBold',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    color: '#375A82',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#B3E0F5',
    borderRadius: 20,
    marginRight: 10,
    fontFamily: 'MontserratSemiBold',
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#B3E0F5',
    // fontWeight: 'bold',
    marginRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 20,
    backgroundColor: '#375A82',
    fontFamily: 'MontserratBold',
  },
  itemContainer: {
    width: '46.5%',
    height: 250,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    padding: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  itemPriceOriginal: {
    fontSize: 15,
    color: '#375A82',
    textAlign: 'left',
    textDecorationLine: 'line-through',
    marginBottom: 20,
    fontFamily: 'Montserrat',
  },
  strikethrough: {
    textDecorationStyle: 'solid',
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // paddingHorizontal: 5, // Menambahkan padding horizontal untuk item
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 15,
    fontFamily: 'MontserratBold',
    maxWidth: '80%',
    textAlign: 'left',
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 15,
    color: '#375A82',
    textAlign: 'left',
    position: 'absolute',
    fontFamily: 'Montserrat',
    bottom: 10,
    left: 10, // Sesuaikan dengan posisi addButton
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#375A82',
    borderRadius: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    alignContent: 'center',
    fontSize: 18,
    fontFamily: 'MontserratBold',
  },
});

export default StarbuckMainPage;

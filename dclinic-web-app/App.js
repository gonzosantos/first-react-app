import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

//Initializing the SDK. 
Parse.setAsyncStorage(AsyncStorage);
//You need to copy BOTH the the Application ID and the Javascript Key from: Dashboard->App Settings->Security & Keys 
Parse.initialize('bCrRgP5l4aLkkzYtcm5KyiB0AmmB7OaQ0JEEyeFh','v7TxqsAeCiCl0d57Wlvmps3OWS9Z1eHaCGG5CewA');
Parse.serverURL = 'https://parseapi.back4app.com/';

const App = () => {
  const [person, setPerson] = useState(new Parse.Object('Person'));

  async function addPerson() {
    try {
      //create a new Parse Object instance
      const newPerson = new Parse.Object('Person');
      //define the attributes you want for your Object
      newPerson.set('name', 'John');
      newPerson.set('email', 'john@back4app.com');
      //save it on Back4App Data Store
      await newPerson.save();
    } catch (error) {
      console.log('Error saving new person: ', error);
    }
  }

  async function fetchPerson() {
    //create your Parse Query using the Person Class you've created
    let query = new Parse.Query('Person');
    //run the query to retrieve all objects on Person class, optionally you can add your filters
    let queryResult = await query.find();
    //the resul is an arry of objects. Pick the first result 
    const currentPerson = queryResult[0];
    //access the Parse Object attributes
    console.log('person id: ', currentPerson.get('id'));
    console.log('person name: ', currentPerson.get('name'));
    console.log('person email: ', currentPerson.get('email'));
    setPerson(currentPerson);
  }

  useEffect(() => {
    fetchPerson()
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Name: {person.get('name')}</Text>
        <Text>email: {person.get('email')}</Text>
        <Button title='Add person' onPress={addPerson} />
        <Button title='Fetch person' onPress={fetchPerson} />
        {/* Your other components here ....*/}
      </View>
    </SafeAreaView>
  )

}

export default App;

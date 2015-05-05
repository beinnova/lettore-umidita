/***************************************
*								   		*
*			UMIDITÀ TERRENO		   		*
*	Sketch per la lettura		   		*
*   analagica dei dati relavati    		*
*	dal sensore SEN0114 		 		*
*								   		*
*   author: Giorgio Cerruti        		*
*	email: giorrio.cerruti@beinnova.it	*
*										*
 ***************************************/

 /----------> CONSTANTS <---------------/

 const int LED_LOW = 7;;
 const int LED_HIGH = 8;
 const int SENSOR_HUMIDITY_A0 = A0;
 const MIN_VALUE = 500;
 const MAX_VALUE = 630;
 
 /----------> VARIABLES <-------------/

 int readed = 0;


 void setup(){

 	//Setup
 	Serial.begin(9600);
 	pinMode(LED_LOW, OUTPUT);
 	pinMode(LED_HIGH, OUTPUT);
 	pinMode(SENSOR, INPUT);

 	//Settings
 	digitalWrite(LED_HIGH, LOW);
 	digitalWrite(LED_LOW, HIGH);

 }


 void loop(){

 	Serial.println("Start!");
 	readed = analogRead(SENSOR_HUMIDITY_A0);

 	Serial.println(JsonEncode("humidity", read))

 	//Check stato umidità
 	if(readed > MAX_VALUE){

 		digitalWrite(LED_LOW, LOW);
 		digitalWrite(LED_HIGH, HIGH);

 	}else{

 		digitalWrite(LED_LOW, HIGH);
 		digitalWrite(LED_HIGH, LOW);
 	}


 }


 String JsonEncode(String key,int value){

 	String retJson = String();
 	retJson = retJson + "{\"" + key + "\":";
 	retJson = retJson + "\""+ value +"\"}\n";

 	return retJson;

 }


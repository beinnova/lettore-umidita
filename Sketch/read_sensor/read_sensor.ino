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

 //----------> CONSTANT <---------------//

 const int LED_LOW = 7;;
 const int LED_HIGH = 8;
 const int SENSOR_HUMIDITY_A0 = A0;
 const int MIN_VALUE = 500;
 const int MAX_VALUE = 630;
 
 //----------> VARIABLES <-------------//

 int readed = 0;


 void setup(){

 	//Setup
 	Serial.begin(9600);
 	pinMode(LED_LOW, OUTPUT);
 	pinMode(LED_HIGH, OUTPUT);
 	pinMode(SENSOR_HUMIDITY_A0, INPUT);

 	//Settings
 	digitalWrite(LED_HIGH, LOW);
 	digitalWrite(LED_LOW, HIGH);

 }


 void loop(){

 	//Leggo i dati dal sensore
 	readed = analogRead(SENSOR_HUMIDITY_A0);
 
        //Stampo su seriale la stringa
 	Serial.println(JsonEncode("humidity", readed));

 	//Check stato umidità
 	if(readed > MAX_VALUE){
                
                 //Spengo led bassa umidità
 		digitalWrite(LED_LOW, LOW);
                 //Accendo led umidità ok
 		digitalWrite(LED_HIGH, HIGH);
                //Invio string 
                Serial.println(JsonEncode("status", 1));

 	}else{
                //Accendo led bassa umidità
 		digitalWrite(LED_LOW, HIGH);
                //Spengo led alta umidità
 		digitalWrite(LED_HIGH, LOW);
                //Invio segnale
                Serial.println(JsonEncode("status", 0));
 	}
 
       //Delay lettura
       delay(1*1000);


 }

/*
*Funzione conversone in JSON
*param key la chiave JSON
*param value valore chiave
*/
 String JsonEncode(String key,int value){

 	String retJson = String();
 	retJson = retJson + "{\"" + key + "\":";
 	retJson = retJson + "\""+ value +"\"}";

 	return retJson;

 }


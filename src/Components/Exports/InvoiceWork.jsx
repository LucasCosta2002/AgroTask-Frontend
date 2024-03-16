import  { Fragment } from 'react'
import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import { formatearFecha } from '../../helpers/formatearFecha';

const InvoiceWork = ({work}) => {

    const formatedDate = formatearFecha(work.date);

    const styles = StyleSheet.create({
        page: {
            fontSize: 11,
            paddingTop: 20,
            paddingLeft: 40,
            paddingRight: 40,
            lineHeight: 1.5,
            flexDirection: 'column',
        },

        spaceBetween: {
            flex: 1,
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:'space-between',
            color: "#3E3E3E" 
        },

        titleContainer: {
            flexDirection: 'row',
            marginTop: 24
        },
        
        logo: { 
            width: 90
        },

        reportTitle: {
            fontSize: 16,
            textAlign: 'center'
        },

        addressTitle: {
            fontSize: 11,
            fontStyle: 'bold'
        }, 
        
        invoice: {
            fontWeight: 'bold',
            fontSize: 20
        },
        
        invoiceNumber: {
            fontSize: 11,
            fontWeight: 'bold'
        }, 
        
        address: {
            fontWeight: 400,
            fontSize: 10
        },
        
        theader: {
            marginTop: 20,
            fontSize: 10,
            fontStyle: 'bold',
            paddingTop: 4,
            paddingLeft: 7,
            flex: 1,
            height:20,
            backgroundColor: '#DEDEDE',
            borderColor: 'whitesmoke',
            borderRightWidth: 1,
            borderBottomWidth: 1
        },

        theader2: {
            flex:2,
            borderRightWidth: 0,
            borderBottomWidth: 1
        },

        tbody: { 
            fontSize: 9,
            paddingTop: 4,
            paddingLeft: 7,
            flex: 1,
            borderColor: 'whitesmoke',
            borderRightWidth: 1,
            borderBottomWidth: 1
        },

        tbody2: {
            flex:2,
            borderRightWidth: 1,
        },
    });

    const InvoiceTitle = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <Image style={styles.logo} src={"../public/logo.png"} />
                <Text style={styles.reportTitle}>Suardi Pulverizaciones S.R.L</Text>
            </View>
        </View>
    );

    const Address = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View>
                    <Text style={styles.invoice}>Resumen </Text>
                    <Text style={styles.invoiceNumber}>Identificador de Trabajo: {work._id} </Text>
                </View>
                <View>
                    <Text style={styles.addressTitle}>Zona Rural</Text>
                    <Text style={styles.addressTitle}>Suardi,</Text>
                    <Text style={styles.addressTitle}>Santa Fe, Argentina.</Text>
                </View>
            </View>
        </View>
    );

    const UserAddress = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View style={{maxWidth : 200}}>
                    <Text style={styles.addressTitle}>Servicio brindado por: </Text>
                    <Text style={styles.address}>
                        {work.user.name}
                    </Text>
                </View>
                <Text style={styles.addressTitle}>{formatedDate}</Text>
            </View>
        </View>
    );

    const TableHead = () => (
        <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
            <View style={[styles.theader, styles.theader2]}>
                <Text >Cliente</Text>   
            </View>
            <View style={styles.theader}>
                <Text>Ubicación</Text>   
            </View>
            <View style={styles.theader}>
                <Text>Agroquimico</Text>   
            </View>
            <View style={styles.theader}>
                <Text>Hectareas</Text>   
            </View>
        </View>
    );

    const TableBody = () => (
        <Fragment >
            <View style={{ width:'100%', flexDirection :'row'}}>
                <View style={[styles.tbody, styles.tbody2]}>
                    <Text >{work.client.name} - {work.client.cuil}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{work.location} </Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{work.agrochemical}</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>{work.hectares}</Text>   
                </View>
            </View>
        </Fragment>
    );
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle  />
                <Address/>
                <UserAddress/>
                <TableHead/>
                <TableBody/>
            </Page>
        </Document>
    )
}

export default InvoiceWork
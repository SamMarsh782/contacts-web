import React, { useState } from 'react';
import { Modal, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';

import StandardButton from '../buttons/standardButton';

type ModalProps = {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  guid: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  companyID: string;
  region: string;
  emailTrue: boolean;
  textTrue: boolean;
  edit: (guid:string, name:string, phone:string, email:string, company:string, companyID:string, region:string, email_T_F:string) => void;
};

const EditExternalModal = ({
  modalVisible,
  setModalVisible,
  guid,
  name,
  phone,
  email,
  company,
  companyID,
  region,
  emailTrue,
  textTrue,
  edit
}: ModalProps) => {

  const [nameInput, setNameInput] = useState(name);
  const [phoneInput, setPhoneInput] = useState(phone);
  const [emailInput, setEmailInput] = useState(email);
  const [companyInput, setCompanyInput] = useState(company);
  const [companyIDInput, setCompanyIDInput] = useState(companyID);
  const [regionInput, setRegionInput] = useState(region);
  const [emailTrueInput, setEmailTrueInput] = useState(emailTrue);
  const [textTrueInput, setTextTrueInput] = useState(textTrue);

  const ModalView = styled(ScrollView)`
    background-color: #C0C0C0;
    border-radius: 20px;
    padding: 10px;
    width: 75%;
    margin: 20px;
    shadow-color: #000;
    shadow-offset-width: 0px;
    shadow-offset-height: 2px;
    shadow-opacity: 0.25;
    shadow-radius: 50px;
    outline: 0;
    elevation: 5;
  `;

  const CenteredView = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
  `;

  const SpacedView = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100px;
  `;

  const ModalTitle = styled(Text)`
    font-size: 20px;
    font-weight: bold;
    color: #485A72;
    margin: 10px 10px 0px 10px;
    text-align: center;
  `;

  const StyledText = styled(Text)`
    font-size: 15px;
    color: #A9936D;
    text-align: center;
    padding: 0 10px;
  `;

  const RowView = styled(View)`
    min-height: 40px;
    display: flex;
    flex-direction: row;
    width: 75%;
    margin: 0 5px;
    border-radius: 10px;
    background-color: white;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
  `;

  const StyledTextInput = styled(TextInput)`
    height: 40px;
    width: 100%;
    padding: 8px;
    color: #A9936D;
    background-color: "#FFFFFF";
  `;

  const NumberText = styled(Text)`
    color: #A9936D;
    padding-left: 8px;
  `;

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <CenteredView>
        <ModalView contentContainerStyle={{ alignItems: 'center' }}>
          <ModalTitle>Name</ModalTitle>
          <RowView>
            <StyledTextInput
              placeholder="Name..."
              value={nameInput}
              onChangeText={setNameInput}
            />
          </RowView>
          <ModalTitle>Phone</ModalTitle>
          <RowView>
            <NumberText style={{ fontSize: 16, marginRight: 4 }}>+1</NumberText>
            <StyledTextInput
              style={{ flex: 1 }}
              placeholder="Phone..."
              keyboardType="number-pad"
              maxLength={10}
              value={phoneInput}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, '');
                setPhoneInput(cleaned);
              }}
            />
          </RowView>
          <ModalTitle>Email</ModalTitle>
          <RowView>
            <StyledTextInput
              placeholder="Email..."
              value={emailInput}
              onChangeText={setEmailInput}
            />
          </RowView>
          <ModalTitle>Company ID</ModalTitle>
          <RowView>
            <StyledTextInput
              placeholder="Company ID..."
              value={companyIDInput}
              onChangeText={setCompanyIDInput}
            />
          </RowView>
          <ModalTitle>Company Name</ModalTitle>
          <RowView>
            <StyledTextInput
              placeholder="Company Name..."
              value={companyInput}
              onChangeText={setCompanyInput}
            />
          </RowView>
          <ModalTitle>Region</ModalTitle>
          <RowView>
            <StyledTextInput
              placeholder="Region..."
              value={regionInput}
              onChangeText={setRegionInput}
            />
          </RowView>
          <ModalTitle>Contact Methods</ModalTitle>
          <RowView>
            <StyledText>Texts:</StyledText>
            <Switch
              trackColor={{ false: "#767577", true: "#485A72" }}
              thumbColor="#A9936D"
              activeThumbColor="#A9936D"
              onValueChange={() => setTextTrueInput(!textTrueInput)}
              value={textTrueInput}
            />
            <StyledText>Emails:</StyledText>
            <Switch
              trackColor={{ false: "#767577", true: "#485A72" }}
              thumbColor="#A9936D"
              activeThumbColor="#A9936D"
              onValueChange={() => setEmailTrueInput(!emailTrueInput)}
              value={emailTrueInput}
            />
          </RowView>
          <SpacedView>
            <StandardButton
              bgColor={"#CC0000"}
              color={"#A9936D"}
              onPress={() => setModalVisible(false)}
              title="Cancel"
              width="40%"
            />
            <StandardButton
              bgColor={"#485A72"}
              color={"#A9936D"}
              onPress={() => edit(guid, nameInput, phoneInput, emailInput, companyInput, companyIDInput, regionInput, (emailTrueInput ? (textTrueInput ? 'Both' : 'Email') : (textTrueInput ? 'Text (SMS)' : '')))}
              title="Save"
              width="45%"
            />
          </SpacedView>
        </ModalView>
      </CenteredView>
    </Modal>
  );
};

export default EditExternalModal;
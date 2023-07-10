import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

// Override styles
const StyledWidget = styled(Widget)`
  .rcw-conversation-container > .rcw-header {
    background-color: red;
  }

  .rcw-message > .rcw-response {
    background-color: black;
    color: white;
  }
`;

const ChatWidget = ({ widgetStyles }) => {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      const url = 'https://your-server-url.com/get-customer-data';
      try {
        const response = await fetch(url);
        const customerData = await response.json();
        setCustomerData(customerData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (window.Shopify && window.Shopify.customer) {
      fetchCustomerData();
    }
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    console.log(`Customer Data: ${customerData}`);
    console.log(`Current Store: ${window.location.href}`);

    const newConvoId = uuidv4();

    const url = 'https://parchedrotatingcommand.alexli81.repl.co/send-message';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage,
          customerId: customerData?.id,
          conversationId: newConvoId,
          currentUrl: window.location.href,
        }),
      });

      const { message: serverMessage } = await response.json();

      addResponseMessage(serverMessage);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <StyledWidget
      handleNewUserMessage={handleNewUserMessage}
      title="Chat Widget"
      subtitle="Ask us anything!"
      senderPlaceHolder="Type a message..."
    />
  );
};

export default ChatWidget;

import React, { useEffect, useState } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import { v4 as uuidv4 } from "uuid";
import "./chatWidgetStyles.css";
import { Tooltip } from "react-tooltip";

const ChatWidget = ({ lancherIcon }) => {
  const [customerData, setCustomerData] = useState(null);
  const [bShowTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    const fetchCustomerData = async () => {
      const url = "https://your-server-url.com/get-customer-data";
      try {
        const response = await fetch(url);
        const customerData = await response.json();
        setCustomerData(customerData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (window.Shopify && window.Shopify.customer) {
      fetchCustomerData();
    }
  }, []);

  useEffect(() => {
    const widgetElement = document.querySelector(".rcw-close-widget-container");
    widgetElement.addEventListener("mouseover", () => {
      setShowTooltip(true);
      console.log('over launcher!')
    });
    widgetElement.addEventListener("mouseout", () => {
      setShowTooltip(false);
    });
  }, []);
  const handleNewUserMessage = async (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    console.log(`Customer Data: ${customerData}`);
    console.log(`Current Store: ${window.location.href}`);

    const newConvoId = uuidv4();

    const url = "https://familiarboringthings.alexli81.repl.co/sendChatMessage";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage,
          customerId: customerData?.id,
          conversationId: newConvoId,
          currentUrl: window.location.href,
        }),
      });

      // Extract the AI's response from the server's response
      const { aiResponse } = await response.json();

      // Add the AI's response to the chat
      addResponseMessage(aiResponse);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div
        className="apply-font"
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Hello world!"
        data-tooltip-place="top"
      >
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          title="Chat Widget"
          subtitle="Ask us anything!"
          senderPlaceHolder="Type a message..."
          emojis="true"
          launcherOpenImg={lancherIcon}
          data-tip="Tooltip content"
        />
        {bShowTooltip && (
          <div
            style={{
              position: 'absolute',
              right:'90px',
              bottom: '30px',
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "5px",
              paddingBottom: "5px",
              backgroundColor: "#fff",
              border: '1px',
              borderColor: '#004588',
              border: 'solid',            
              borderRadius: "10px",
              width: '100px',
              textAlign: 'center',              
            }}
          >
            Chat with us
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWidget;

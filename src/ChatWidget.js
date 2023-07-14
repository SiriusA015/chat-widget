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

  const handleTooltip = () => {
    console.log("btooltip: ", bShowTooltip);
    setShowTooltip(!bShowTooltip);
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
          onMouseEnter={() => {
            handleTooltip();
          }}
          className="widget-with-tooltip"
        />
        {bShowTooltip && (
          <div
            style={{
              position: "fixed",
              right: "150px",
              bottom: "30px",
              width: "200px",
              height: "50px",
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

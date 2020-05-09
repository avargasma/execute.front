import React from 'react';
import { custom } from "devextreme/ui/dialog";

function MessageComponent(props) {

    function handleMessage(message, title) {
        let wDialog = custom({
          title: title ? title : "System",
          messageHtml: message,
          buttons: [
            {
              text: "Ok",
              onClick: (e) => {
                return true;
              },
            },
          ],
        });
        return wDialog;
      }

    return (
        <div>
            {props.handleMessage = handleMessage(props.message, props.title)}
        </div>
    );
}

export { MessageComponent };
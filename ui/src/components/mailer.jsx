import React, { useEffect, useState } from 'react';
import { sendEmail } from '../util/api-conn';

export default function Mailer() {
  useEffect(() => {
    console.log('hello');
    sendEmail('james', 'infernezor@gmail.com', 'we are a message.');
  }, []);
  return <>hello, I'm mailing</>;
}

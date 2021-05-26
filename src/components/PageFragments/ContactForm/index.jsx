import {
  Col, Form, Input, Button, message, notification,
} from 'antd';
import React, { useState } from 'react';
import Config from '../../../../config';

const openNotification = () => {
  const description = (
    <>
      However I noticed you have not sent your email address 😢,
      though I can understand but it would be great if I can reply you back.
      <br />
      Try reaching me again if you ever wanted to have a chat. 🤙
    </>
  );
  notification.info({
    message: 'Thanks for reaching out! 🙇‍♂️',
    description,
    duration: 0,
  });
};

const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a valid email!',
  },
};

export default () => {
  const [form] = Form.useForm();
  const [isLoading, setLoader] = useState(false);

  const onFinish = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    // TODO: Momin find out how to use ACTION attribute here (reasons: see '_captcha' below)

    const name = form.getFieldValue('name');
    const email = form.getFieldValue('email');

    if (email) formData.append('_replyto', email);
    formData.append('_subject', `Hey 👋 from "${name}" via MominBinShahid.github.io`);
    formData.append('_template', 'table'); // template used for email body 'FormSubmit.co' sent to me
    formData.append('_captcha', 'false'); // because I am using AJAX, not ACTION
    // formData.append(
    //   '_autoresponse',
    // eslint-disable-next-line max-len
    //   'Thanks for taking time to contact me. I will get back to you as soon as possible.\nRegards: Momin Bin Shahid',
    // ); // WON'T WORK, because I am using AJAX, not ACTION

    setLoader(true);

    fetch(Config.contactFormUrl, { method: 'POST', body: formData })
      .then((res) => {
        if (!res.ok) throw new Error('Error Occurred in success callback');

        message.success('Thank you for your kind response 🙂. Will get back to you.');
        if (!email) {
          const seconds = 4 * 1000; // 4 seconds: 4 * 1000 milliseconds
          setTimeout(() => {
            openNotification();
          }, seconds);
        }

        form.resetFields();
      })
      .catch((error) => {
        message.error('😢 Pardon me. Can not contact right now, please use any social media to reach me. 🙏');

        // eslint-disable-next-line no-console
        console.error('Error:', error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <Col sm={24} md={24} lg={12} className="widthFull">
      <Form form={form} name="nest-messages" validateMessages={validateMessages} onFinish={onFinish} autoComplete="off">

        <Form.Item name={['name']} rules={[{ required: true }]}>
          <Input size="large" placeholder="Full Name *" />
        </Form.Item>
        <Form.Item name={['email']} rules={[{ type: 'email' }]}>
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item name={['description']} rules={[{ required: true }]}>
          <Input.TextArea size="large" rows={7} placeholder="Description *" />
        </Form.Item>

        <Form.Item name={['_honey']} hidden>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" shape="round" size="large" htmlType="submit" style={{ background: '#304CFD' }} loading={isLoading}>
            SUBMIT
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

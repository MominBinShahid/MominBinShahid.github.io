import {
  Col, Form, Input, Button, message, notification,
} from 'antd';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FrownOutlined } from '@ant-design/icons';
import Config from '../../../../config';
import { debounce } from '../../../utils/common';
import { isInDarkMode } from '../../../utils/darkMode';
import style from './contact.module.less';

const showInvertedEmojiWarning = () => {
  const description = (
    <>
      You caught me there
      {' '}
      <emoji>🙌</emoji>
      <br />
      Can you ignore these inverted emojis for now
      {' '}
      <emoji>🙏</emoji>
      {' '}
      But do send them to me as these are only appearing like this here
      <div style={{ marginTop: '5px', marginBottom: '5px' }}>
        Want to know the reason?
        {' '}
        <emoji>🤔</emoji>
        <br />
        It&apos;s because of a particular implementation of dark mode,
        which is done by using CSS filters. Other emojis are looking okay
        (i.e. looking like this
        {' '}
        <emoji>🤪</emoji>
        {' '}
        and not like this 🤪)
        because specific CSS is applied to those emojis using a
        special wrapped tag to fix the color inversion but can not apply
        those rules to a specific text inside a textarea or input fields
      </div>
      If you wanted to discuss this further (or anything else) do reach out
      {' '}
      <emoji>🤙</emoji>
    </>
  );
  notification.open({
    message: (
      <>
        Oops
        {' '}
        <emoji>😢</emoji>
        {' '}
        have you noticed something wrong!?
      </>
    ),
    description,
    icon: <FrownOutlined style={{ color: 'crimson' }} />,
    duration: 0,
  });
};

let IsInvertedEmojiWarningAlreadyShowed = false;
const checkForInvertedEmoji = (changedValues) => {
  // console.count('checkForInvertedEmoji');

  // if its not dark mode, then no need to show the warning
  if (!isInDarkMode() || IsInvertedEmojiWarningAlreadyShowed) return;

  Object.keys(changedValues).forEach((fieldKey) => {
    const fieldValue = changedValues[fieldKey];

    const emojiRegex = /([\p{Emoji}\u200d]+)/gu;
    const isEmojiUsed = emojiRegex.test(fieldValue);

    if (!isEmojiUsed) return;

    IsInvertedEmojiWarningAlreadyShowed = true;
    showInvertedEmojiWarning();
  });
};
const debouncedCheckForInvertedEmoji = debounce(checkForInvertedEmoji, 500);

const openNotification = () => {
  const description = (
    <>
      However I noticed you have not sent your email address
      {' '}
      <emoji>😢</emoji>
      , though I can understand but it would be great if I can reply you back.
      <br />
      Try reaching me again if you ever wanted to have a chat
      {' '}
      <emoji>🤙</emoji>
    </>
  );
  notification.info({
    message: (
      <>
        Thanks for reaching out!
        {' '}
        <emoji>🙇‍♂️</emoji>
      </>
    ),
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

        message.success(
          <>
            Thank you for your kind response
            {' '}
            <emoji>🙂</emoji>
            Will get back to you.
          </>,
        );
        if (!email) {
          const seconds = 4 * 1000; // 4 seconds: 4 * 1000 milliseconds
          setTimeout(() => {
            openNotification();
          }, seconds);
        }

        form.resetFields();
      })
      .catch((error) => {
        message.error(
          <>
            <emoji>😢</emoji>
            {' '}
            Pardon me. Can not contact right now, please use any social media to reach me
            {' '}
            <emoji>🙏</emoji>
          </>,
        );

        // eslint-disable-next-line no-console
        console.error('Error:', error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const onValuesChange = (changedValues) => {
    // console.count('onValuesChange');
    debouncedCheckForInvertedEmoji(changedValues);
  };

  return (
    <Col sm={24} md={24} lg={12} className="widthFull">
      <Form form={form} name="nest-messages" validateMessages={validateMessages} onFinish={onFinish} onValuesChange={onValuesChange} autoComplete="off">

        <Form.Item name={['name']} rules={[{ required: true }]}>
          <Input aria-label="name" size="large" placeholder="Full Name *" />
        </Form.Item>
        <Form.Item name={['email']} rules={[{ type: 'email' }]}>
          <Input aria-label="email" size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item name={['description']} rules={[{ required: true }]}>
          <Input.TextArea aria-label="description" size="large" rows={7} placeholder="Description *" />
        </Form.Item>

        <Form.Item name={['_honey']} hidden>
          <Input aria-label="honey form validator field" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" shape="round" size="large" htmlType="submit" className={`${style.submitButton}`} loading={isLoading}>
            SUBMIT
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

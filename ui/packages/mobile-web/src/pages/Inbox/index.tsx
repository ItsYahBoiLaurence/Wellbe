import React from "react";
import { Container, Card, List, Avatar, Text, Group, Badge, ScrollArea } from "@mantine/core";
import { useState } from "react";

const messages = [
  {
    id: 1,
    sender: "Wellbe",
    subject: "Hi there!",
    preview: "How are you today?",
    timestamp: "9:56 AM",
  },
  {
    id: 2,
    sender: "Wellbe",
    subject: "It's been a while",
    preview: "How are you?",
    timestamp: "yesterday",
  },
  {
    id: 3,
    sender: "Wellbe",
    subject: "Photos from holiday",
    preview: "Hi, I put together some photos from...",
    timestamp: "5 Mar",
  },
  {
    id: 4,
    sender: "Wellbe",
    subject: "Latest order delivery",
    preview: "Good morning! Hope you are good...",
    timestamp: "4 Mar",
  },
  {
    id: 5,
    sender: "Wellbe",
    subject: "Service confirmation",
    preview: "Respected Sir, I Peter, your computer...",
    timestamp: "4 Mar",
  },
  {
    id: 6,
    sender: "Wellbe",
    subject: "Re: Blog for beta release",
    preview: "Hi, Please take a look at the beta...",
    timestamp: "3 Mar",
  },
];

const InboxPage = () => {
  return (
    <Container fluid style={{ margin: "0px" }}>
      <Text size="xl" mb="md">
        Inbox
      </Text>

      <List spacing="xs">
        <ScrollArea style={{
          width: "100%", height: "100%"
        }} scrollbars="y" >
          {
            messages.map((message) => (
              <Card
                key={message.id}
                shadow="xs"
                p="sm"
                radius="md"
                style={{
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              >
                <Group align="flex-start">
                  {/* Sender and Avatar */}
                  <Group>
                    <Avatar size="lg" radius="xl" color="blue">
                      {message.sender[0]}
                    </Avatar>
                    <div>
                      <Text >{message.sender}</Text>
                      <Text size="sm" color="dimmed">
                        {message.preview}
                      </Text>
                    </div>
                  </Group>

                  {/* Timestamp */}
                  <Text size="xs" color="dimmed">
                    {message.timestamp}
                  </Text>
                </Group>

                {/* Subject */}
                <Text mt="sm">
                  {message.subject}
                </Text>
              </Card>
            ))
          }
        </ScrollArea>
      </List>


    </Container >
  );
};

export default InboxPage;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';

interface ChatMessage {
  id: string;
  text: string;
  timestamp: string;
  isFromDoctor: boolean;
  hasImage?: boolean;
}

interface ChatScreenProps {
  onEndChat: () => void;
  onBack?: () => void;
  doctorName?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    text: "Hi! How are you feeling today?",
    timestamp: 'Today, 9:00 AM',
    isFromDoctor: true,
  },
  {
    id: '2',
    text: "I've been having headaches for 3 days",
    timestamp: 'Today, 9:02 AM',
    isFromDoctor: false,
  },
  {
    id: '3',
    text: 'Can you describe the severity? Is it a throbbing pain?',
    timestamp: 'Today, 9:03 AM',
    isFromDoctor: true,
  },
  {
    id: '4',
    text: 'Yes, and it gets worse in the afternoon',
    timestamp: 'Today, 9:04 AM',
    isFromDoctor: false,
  },
  {
    id: '5',
    text: 'I see. I would like to share some medical literature with you.',
    timestamp: 'Today, 9:05 AM',
    isFromDoctor: true,
    hasImage: true,
  },
  {
    id: '6',
    text: 'Thank you, this is helpful',
    timestamp: 'Today, 9:07 AM',
    isFromDoctor: false,
  },
];

export function ChatScreen({
  onEndChat,
  onBack,
  doctorName = 'Dr. Sarah Martinez',
}: ChatScreenProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: (messages.length + 1).toString(),
        text: inputText,
        timestamp: 'Today, 9:10 AM',
        isFromDoctor: false,
      };
      setMessages([...messages, newMessage]);
      setInputText('');

      // Simulate doctor response
      setTimeout(() => {
        const doctorResponse: ChatMessage = {
          id: (messages.length + 2).toString(),
          text: 'Thank you for sharing that. Let me get back to you shortly.',
          timestamp: 'Today, 9:11 AM',
          isFromDoctor: true,
        };
        setMessages((prev) => [...prev, doctorResponse]);
      }, 1000);
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.isFromDoctor ? styles.doctorMessage : styles.patientMessage,
        ]}
      >
        {!item.isFromDoctor && (
          <View
            style={[
              styles.messageContent,
              {
                backgroundColor: theme.primary,
                maxWidth: '85%',
              },
            ]}
          >
            <Text style={[styles.messageText, { color: '#fff' }]}>
              {item.text}
            </Text>
            {item.hasImage && (
              <View
                style={[
                  styles.imagePlaceholder,
                  { backgroundColor: 'rgba(255,255,255,0.2)' },
                ]}
              >
                <MaterialCommunityIcons
                  name="file-document"
                  size={24}
                  color="#fff"
                />
              </View>
            )}
            <Text style={[styles.messageTimestamp, { color: 'rgba(255,255,255,0.7)' }]}>
              {item.timestamp}
            </Text>
          </View>
        )}

        {item.isFromDoctor && (
          <View
            style={[
              styles.messageContent,
              {
                backgroundColor: theme.backgroundElement,
                maxWidth: '85%',
              },
            ]}
          >
            <Text style={[styles.messageText, { color: theme.text }]}>
              {item.text}
            </Text>
            {item.hasImage && (
              <View
                style={[
                  styles.imagePlaceholder,
                  { backgroundColor: theme.border },
                ]}
              >
                <MaterialCommunityIcons
                  name="file-document"
                  size={24}
                  color={theme.primary}
                />
              </View>
            )}
            <Text
              style={[
                styles.messageTimestamp,
                { color: theme.textSecondary },
              ]}
            >
              {item.timestamp}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { borderBottomColor: theme.border, backgroundColor: theme.backgroundElement },
        ]}
      >
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="chevron-left" size={24} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.headerLeft}>
          <View style={[styles.doctorAvatar, { backgroundColor: theme.primary }]}>
            <Text style={styles.avatarText}>SM</Text>
          </View>
          <View>
            <Text style={[styles.doctorName, { color: theme.text }]}>
              {doctorName}
            </Text>
            <Text style={[styles.patientInfo, { color: theme.textSecondary }]}>
              28Y • Female
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={onEndChat} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text
            style={[
              styles.endChatButton,
              { color: theme.error },
            ]}
          >
            End
          </Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View
          style={[
            styles.inputWrapper,
            {
              borderTopColor: theme.border,
              backgroundColor: theme.background,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.attachmentButton}
            onPress={() => {}}
          >
            <Feather
              name="paperclip"
              size={20}
              color={theme.primary}
            />
          </TouchableOpacity>

          <TextInput
            placeholder="Type your message..."
            placeholderTextColor={theme.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            style={[
              styles.input,
              {
                color: theme.text,
                backgroundColor: theme.backgroundElement,
                maxHeight: 100,
              },
            ]}
            multiline
          />

          <TouchableOpacity
            onPress={handleSendMessage}
            style={[
              styles.sendButton,
              {
                backgroundColor: theme.primary,
                opacity: inputText.trim() ? 1 : 0.5,
              },
            ]}
            disabled={!inputText.trim()}
          >
            <Feather name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Platform.OS === 'web' ? 12 : (Platform.OS === 'ios' ? 50 : 36),
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: Spacing.two,
    marginRight: Spacing.two,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    flex: 1,
  },
  doctorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  doctorName: {
    fontSize: 13,
    fontWeight: '700',
  },
  patientInfo: {
    fontSize: 11,
    marginTop: 1,
  },
  endChatButton: {
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: Spacing.two,
  },
  messagesList: {
    paddingVertical: Spacing.two,
  },
  messageContainer: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 2,
    flexDirection: 'row',
  },
  doctorMessage: {
    justifyContent: 'flex-start',
  },
  patientMessage: {
    justifyContent: 'flex-end',
  },
  messageContent: {
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 2,
  },
  messageText: {
    fontSize: 13,
    lineHeight: 18,
  },
  imagePlaceholder: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  messageTimestamp: {
    fontSize: 9,
    marginTop: Spacing.one,
  },
  inputContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderTopWidth: 1,
  },
  attachmentButton: {
    padding: Spacing.two,
  },
  input: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 2,
    fontSize: 13,
    maxHeight: 80,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { IconButton, Text } from 'react-native-paper';

import useAppTheme from '@/hooks/useAppTheme';
import { Ticket } from '@/types';

type RightActionsProps = {
  containerStyle?: StyleProp<ViewStyle>;
  iconColor?: string;
  onDelete: () => void;
};

type TicketListItemProps = {
  ticket: Ticket;
  onPress: (e: GestureResponderEvent) => void;
  onDelete: (token: string) => void;
};

function RightActions({ containerStyle, iconColor, onDelete }: RightActionsProps) {
  return (
    <View style={[styles.rightAction, containerStyle]}>
      <IconButton
        icon="delete"
        style={styles.rightActionButton}
        iconColor={iconColor}
        size={32}
        onPress={onDelete}
      />
    </View>
  );
}

export default function TicketListItem({ ticket, onPress, onDelete }: TicketListItemProps) {
  const theme = useAppTheme();

  return (
    <Swipeable
      renderRightActions={() => (
        <RightActions
          containerStyle={{ backgroundColor: theme.colors.error }}
          iconColor={theme.colors.onError}
          onDelete={() => onDelete(ticket.token)}
        />
      )}
      overshootRight={false}
    >
      <Pressable
        onPress={onPress}
        style={[
          styles.item,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.surfaceDisabled,
          },
        ]}
      >
        <View style={styles.infoContainer}>
          <Text variant="titleMedium">{ticket.scannedAt.toLocaleString()}</Text>
          <Text variant="bodyLarge">{ticket.eventName}</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceDisabled }}>
            {ticket.categoryName}
          </Text>
        </View>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  rightAction: {
    width: 100,
  },
  rightActionButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
  },
  infoContainer: {
    gap: 4,
  },
});

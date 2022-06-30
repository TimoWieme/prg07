import {
  Text,
} from 'react-native';


export default function OverviewCard ({ input, style, onPress})  {
     return (
      <Text
      style={style}
      onPress={onPress}
      >
        {input}
      </Text>
    );
  }

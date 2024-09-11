'use client';

import { useState } from 'react';
import { Button } from '@/ui/shadcn/ui/button';
import { Input } from '@/ui/shadcn/ui/input';
import { ScrollArea } from '@/ui/shadcn/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui/shadcn/ui/popover';
import { Cat, Utensils, Shirt, Smile } from 'lucide-react';

const emojiCategories = {
  Animals: [
    '🐵',
    '🐒',
    '🦍',
    '🦧',
    '🐶',
    '🐕',
    '🦮',
    '🐕‍🦺',
    '🐩',
    '🐺',
    '🦊',
    '🦝',
    '🐱',
    '🐈',
    '🐈‍⬛',
    '🦁',
    '🐯',
    '🐅',
    '🐆',
    '🐴',
    '🐎',
    '🦄',
    '🦓',
    '🦌',
    '🐮',
    '🐂',
    '🐃',
    '🐄',
    '🐷',
    '🐖',
    '🐗',
    '🐽',
    '🐏',
    '🐑',
    '🐐',
    '🐪',
    '🐫',
    '🦙',
    '🦒',
    '🐘',
    '🦏',
    '🦛',
    '🐭',
    '🐁',
    '🐀',
    '🐹',
    '🐰',
    '🐇',
    '🐿️',
    '🦔',
    '🦇',
    '🐻',
    '🐻‍❄️',
    '🐨',
    '🐼',
    '🦥',
    '🦦',
    '🦨',
    '🦘',
    '🦡',
  ],
  Food: [
    '🍏',
    '🍎',
    '🍐',
    '🍊',
    '🍋',
    '🍌',
    '🍉',
    '🍇',
    '🍓',
    '🍈',
    '🍒',
    '🍑',
    '🥭',
    '🍍',
    '🥥',
    '🥝',
    '🍅',
    '🍆',
    '🥑',
    '🥦',
    '🥬',
    '🥒',
    '🌶️',
    '🌽',
    '🥕',
    '🧄',
    '🧅',
    '🥔',
    '🍠',
    '🥐',
    '🥯',
    '🍞',
    '🥖',
    '🥨',
    '🧀',
    '🥚',
    '🍳',
    '🧈',
    '🥞',
    '🧇',
    '🥓',
    '🥩',
    '🍗',
    '🍖',
    '🦴',
    '🌭',
    '🍔',
    '🍟',
    '🍕',
    '🥪',
    '🥙',
    '🧆',
    '🌮',
    '🌯',
    '🥗',
    '🥘',
    '🥫',
    '🍝',
    '🍜',
    '🍲',
    '🍛',
    '🍣',
    '🍱',
    '🥟',
    '🦪',
    '🍤',
    '🍙',
    '🍚',
    '🍘',
    '🍥',
    '🥠',
    '🥮',
    '🍢',
    '🍡',
    '🍧',
    '🍨',
    '🍦',
    '🥧',
    '🧁',
    '🍰',
    '🎂',
    '🍮',
    '🍭',
    '🍬',
    '🍫',
    '🍿',
    '🍩',
    '🍪',
    '🌰',
    '🥜',
    '🍯',
    '🥛',
    '🍼',
    '☕',
    '🍵',
    '🧃',
    '🥤',
    '🍶',
    '🍺',
    '🍻',
    '🥂',
    '🍷',
    '🥃',
    '🍸',
    '🍹',
    '🧉',
    '🍾',
    '🧊',
  ],
  Clothing: [
    '👚',
    '👕',
    '👖',
    '👔',
    '👗',
    '👙',
    '👘',
    '👠',
    '👡',
    '👢',
    '👞',
    '👟',
    '🥾',
    '🥿',
    '👒',
    '🎩',
    '🎓',
    '🧢',
    '⛑️',
    '👑',
    '💍',
    '👝',
    '👛',
    '👜',
    '💼',
    '🎒',
    '🧳',
    '👓',
    '🕶️',
    '🥽',
    '🌂',
  ],
  Smileys: [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '🤣',
    '😂',
    '🙂',
    '🙃',
    '😉',
    '😊',
    '😇',
    '🥰',
    '😍',
    '🤩',
    '😘',
    '😗',
    '☺️',
    '😚',
    '😙',
    '🥲',
    '😋',
    '😛',
    '😜',
    '🤪',
    '😝',
    '🤑',
    '🤗',
    '🤭',
    '🤫',
    '🤔',
    '🤐',
    '🤨',
    '😐',
    '😑',
    '😶',
    '😶‍🌫️',
    '😏',
    '😒',
    '🙄',
    '😬',
    '😮‍💨',
    '🤥',
    '😌',
    '😔',
    '😪',
    '🤤',
    '😴',
    '😷',
    '🤒',
    '🤕',
    '🤢',
    '🤮',
    '🤧',
    '🥵',
    '🥶',
    '🥴',
    '😵',
    '😵‍💫',
    '🤯',
    '🤠',
    '🥳',
    '🥸',
    '😎',
    '🤓',
    '🧐',
    '😕',
    '😟',
    '🙁',
    '☹️',
    '😮',
    '😯',
    '😲',
    '😳',
    '🥺',
    '😦',
    '😧',
    '😨',
    '😰',
    '😥',
    '😢',
    '😭',
    '😱',
    '😖',
    '😣',
    '😞',
    '😓',
    '😩',
    '😫',
    '🥱',
    '😤',
    '😡',
    '😠',
    '🤬',
    '😈',
    '👿',
    '💀',
    '☠️',
    '💩',
    '🤡',
    '👹',
    '👺',
    '👻',
    '👽',
    '👾',
    '🤖',
  ],
};

type EmojiCategory = keyof typeof emojiCategories;

export default function EmojiPicker() {
  const [selectedCategory, setSelectedCategory] =
    useState<EmojiCategory>('Animals');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const filteredEmojis = searchTerm
    ? Object.values(emojiCategories)
        .flat()
        .filter((emoji) => emoji.includes(searchTerm))
    : emojiCategories[selectedCategory];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-10 p-0 rounded-r-none">
          {selectedEmoji || '🍄'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 h-max">
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 text-white"
          />
          <div className="flex justify-between">
            <Button
              variant="ghost"
              className={`p-2 ${
                selectedCategory === 'Animals' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setSelectedCategory('Animals')}
            >
              <Cat className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className={`p-2 ${
                selectedCategory === 'Food' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setSelectedCategory('Food')}
            >
              <Utensils className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className={`p-2 ${
                selectedCategory === 'Clothing' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setSelectedCategory('Clothing')}
            >
              <Shirt className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className={`p-2 ${
                selectedCategory === 'Smileys' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setSelectedCategory('Smileys')}
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-72">
            <div className="grid grid-cols-8 gap-2">
              {filteredEmojis.map((emoji, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}

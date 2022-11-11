import { useEffect, useState } from 'react';
import { VStack, useToast, HStack } from 'native-base'
import { useRoute } from '@react-navigation/native';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { PollCardPros } from '../components/PollCard';
import { PollHeader } from '../components/PollHeader';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';

import { api } from '../services/api';
import { Option } from '../components/Option';
import { Share } from 'react-native';
import { Guesses } from '../components/Guesses';

interface RouteParams {
  id: string;
}

export function Details() {
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses');
  const [isLoading, setIsLoading] = useState(false);
  const [pollDetail, setPollDetail] = useState<PollCardPros>({} as PollCardPros)

  const toast = useToast();
  const route = useRoute();
  const { id } = route.params as RouteParams;

  async function fetchPollDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/polls/${id}`);
      setPollDetail(response.data.poll);

    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.600'
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: pollDetail.code
    });
  }

  useEffect(() => {
    fetchPollDetails();
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title={pollDetail.title} showBackButton showShareButton onShare={handleCodeShare} />

      {
        pollDetail._count?.participants > 0 ?
          <VStack px={5} flex={1} >
            <PollHeader data={pollDetail} />

            <HStack bgColor="gray.800" p={1} rounded="sm" mb={5} >
              <Option
                title="Seus palpites"
                isSelected={optionSelected === 'guesses'}
                onPress={() => setOptionSelected('guesses')}
              />
              <Option
                title="Ranking do grupo"
                isSelected={optionSelected === 'ranking'}
                onPress={() => setOptionSelected('ranking')}
              />
            </HStack>

            <Guesses pollId={pollDetail.id} code={pollDetail.code} />

          </VStack>

          : <EmptyMyPoolList code={pollDetail.code} />

      }
    </VStack>
  );
}
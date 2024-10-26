import { RootState } from '@interfaces';
import { useAnimalModel } from '@examples/models';
import { useSelector } from 'react-redux';
import { createRandomAnimal } from '@examples/mocks/fakers';

export interface AnimalItemProps {
  animalId?: number;
}

export const AnimalItem: React.FC<AnimalItemProps> = ({ animalId }) => {
  const animalModel = useAnimalModel();
  const { data: animal, loading } = useSelector((state: RootState) =>
    animalModel.selectEntity(state, animalId)
  );

  const update = () => {
    animalId &&
      animalModel.update(animalId, {
        ...createRandomAnimal(),
        id: animalId,
      });
  };

  const remove = () => {
    animalId && animalModel.remove(animalId);
  };

  return (
    <div
      id={String(animal?.id)}
      style={{ border: '1px solid black', padding: 5 }}
    >
      {loading ? (
        <>Loading...</>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {animalId}. Name: {animal?.name}
          </div>
          <div>
            <button onClick={update}>
              {animalModel.updateState.isLoading ? 'Updating...' : 'Update'}
            </button>
            <button onClick={remove}>
              {animalModel.removeState.isLoading ? 'Removing...' : 'Remove'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { toast } from 'react-toastify';
import * as API from 'services/categories-API';
import NotFoundWrapp from 'components/ReusableComponents/NotFoundWrapp';
import Loader from 'components/Loader';

const CategoriesList: FC = () => {
  const { categoryName: category } = useParams<string>();
  const [tabValue, setTabValue] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    async function getAllCategories() {
      try {
        setIsLoading(true);
        const { data } = await API.fetchAllCategories();

        setCategories(data);
        if (category) {
          const categoryCapitalize =
            category[0].toUpperCase() + category.slice(1);
          const indexOfCategory = data.indexOf(categoryCapitalize);
          if (indexOfCategory > 0) setTabValue(indexOfCategory);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          toast.error(t('categoriesList.error'));
        }
      } finally {
        setIsLoading(false);
      }
    }
    getAllCategories();
  }, [category, t]);

  useEffect(() => {
    if (categories.length > 0) {
      const navigateCategory: string = categories[tabValue];
      const lowercaseNavCategory: string = navigateCategory.toLowerCase();
      navigate(`/categories/${lowercaseNavCategory}`);
    }
  }, [categories, navigate, tabValue]);

  const handleChange = (e: React.ChangeEvent<{}>, newCategory: number) => {
    navigate(`/categories/${categories[newCategory]}`);
    setTabValue(newCategory);
  };

  return (
    <>
      {isLoading && <Loader />}
      {categories && (
        <div>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            sx={{
              marginTop: '50px',

              '@media (min-width: 768px)': {
                marginTop: '72px',
              },
              '@media (min-width: 1440px)': {
                marginTop: '100px',
              },

              '& .MuiTabs-scroller': {
                '& .css-1aquho2-MuiTabs-indicator': {
                  backgroundColor: '#8BAA36',
                },
                '& .css-ttwr4n': { backgroundColor: '#8BAA36' },
                transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              },
              '& .MuiTabs-flexContainer': {
                transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                gap: '28px',
                '@media (min-width: 768px)': {
                  gap: '55px',
                },
                '& :hover': {
                  color: '#8BAA36',
                },
              },

              '& .MuiTab-root': {
                textTransform: 'capitalize',
                minWidth: 'unset',
                fontSize: '18px',
                fontFamily: 'Poppins',
                fontWeight: '400',
                lineHeight: '18px',
                borderColor: '#8BAA36',
                transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
              },

              '& svg': {
                opacity: 0.8,
                stroke: '#8BAA36',
                strokeWidth: '3px',
                transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
              },
            }}
          >
            {categories.map((category: string, idx: number) => {
              return (
                <Tab
                  label={category.toLowerCase()}
                  key={idx}
                  sx={{
                    padding: '0',
                    color: '#BDBDBD',
                    '&.Mui-selected': {
                      color: '#8BAA36',
                    },
                  }}
                />
              );
            })}
          </Tabs>
        </div>
      )}
      {error && <NotFoundWrapp>{t('categoriesList.errorText')}</NotFoundWrapp>}
    </>
  );
};

export default CategoriesList;

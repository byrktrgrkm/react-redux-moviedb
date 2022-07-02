import { FormControlLabel, Switch } from "@mui/material";
import { Container } from "@mui/system";
import { useSelector, useDispatch } from 'react-redux';
import {
    switchTheme,
    selectTheme
  } from '../features/theme/ThemeSlice'

const Footer = () =>{
    const theme = useSelector(selectTheme);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(switchTheme(theme == 'dark' ? 'light' : 'dark'))
    };

    return (
        <footer>
            <Container>
            <nav>
                <li>Fimler</li>
                <li>Popüler Filmler</li>
                <li>Gösterimdeki Filmler</li>
            </nav>

            <FormControlLabel control={<Switch checked={theme == 'dark'}
      onChange={handleChange} defaultChecked />} label={theme == 'dark' ? 'Koyu Tema' : 'Açık Tema'} />
            </Container>
        </footer>
    );
}


export default Footer;
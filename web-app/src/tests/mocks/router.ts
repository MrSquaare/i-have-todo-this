export const mockedNavigate = jest.fn();

export const mockedUseNavigate = jest.fn();
export const mockedUseParams = jest.fn();

mockedUseParams.mockReturnValue({});
mockedUseNavigate.mockReturnValue(mockedNavigate);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: mockedUseNavigate,
  useParams: mockedUseParams,
}));

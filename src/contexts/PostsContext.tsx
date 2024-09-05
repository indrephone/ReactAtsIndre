import { createContext, useReducer, useEffect } from 'react';

export type PostType = {
    id: string;
    authorId: string;
    dateTime: string;
    title: string;
    image: string;
    description: string;
};

type PostReducerAction =
  | { type: 'setData'; allData: PostType[] }
  | { type: 'add'; newPost: PostType }
  | { type: 'remove'; id: string };

type ChildrenType = { children: React.ReactNode };

export type PostsContextTypes = {
    posts: PostType[];
    addNewPost: (newPost: PostType) => void;
    removePost: (id: string) => void;
    getSpecificPost: (id: string) => PostType | undefined;
};

const reducer = (state: PostType[], action: PostReducerAction): PostType[] => {
    switch (action.type) {
        case 'setData':
            return action.allData;
        case 'add':
            return [...state, action.newPost];
        case 'remove':
            return state.filter((post) => post.id !== action.id);
        default:
            return state;
    }
};

const PostsContext = createContext<PostsContextTypes | undefined>(undefined);

const PostsProvider = ({ children }: ChildrenType) => {
    const [posts, dispatch] = useReducer(reducer, []);

    const addNewPost = (newPost: PostType) => {
        fetch(`http://localhost:8080/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        })
        .then((res) => res.json())
        .then((data: PostType) => {
            dispatch({
                type: 'add',
                newPost: data,
            });
        })
        .catch((error) => {
            console.error('Error adding post:', error);
        });
    };

    const removePost = (id: string) => {
        fetch(`http://localhost:8080/posts/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            dispatch({
                type: 'remove',
                id: id,
            });
        })
        .catch((error) => {
            console.error('Error removing post:', error);
        });
    };

    const getSpecificPost = (id: string): PostType | undefined => {
        return posts.find((post) => post.id === id);
    };

    useEffect(() => {
        fetch(`http://localhost:8080/posts`)
            .then((res) => res.json())
            .then((data: PostType[]) => {
                dispatch({
                    type: 'setData',
                    allData: data,
                });
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <PostsContext.Provider
            value={{
                posts,
                addNewPost,
                removePost,
                getSpecificPost,
            }}
        >
            {children}
        </PostsContext.Provider>
    );
};

export { PostsProvider };
export default PostsContext;

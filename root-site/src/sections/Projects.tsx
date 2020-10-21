import React from 'react';
import { Box, Image, Flex } from 'rebass/styled-components';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Fade } from 'react-awesome-reveal';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';

import { Project as ProjectType, Image as ImageType } from '../types';
import Section from '../components/Section';
import Triangle from '../components/Triangle';
import markdownRenderer from '../components/MarkdownRenderer';
import { useProjectsQuery } from '../queries/useProjectsQuery';

const Projects = () => {
  const projects = useProjectsQuery();

  return (
    <>
      {projects.map((project, idx) => (
        <Project key={idx} project={project} />
      ))}
    </>
  );
};

const Project = ({ project }: { project: ProjectType }) => (
  <SimpleReactLightbox>
    <Section.Container id={project.name} Background={Background}>
      <Section.Header name={project.name} />
      <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        <Box width={[1, 1, 4 / 6]} px={[1, 2, 4]} mt={2}>
          <Fade direction="down" triggerOnce>
            <ReactMarkdown
              source={project.extendedDescription}
              renderers={markdownRenderer}
            />
          </Fade>
        </Box>
        <Screenshots screenshots={project.screenshots} />
      </Flex>
    </Section.Container>
  </SimpleReactLightbox>
);

const Screenshots = ({ screenshots }: { screenshots: ImageType[] }) => {
  if (!screenshots.length) return null;

  return (
    <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
      <SRLWrapper>
        {screenshots.map((screenshot, idx) => (
          <Screenshot key={idx} mt={[4, 4, 0]} ml={[0, 0, 1]} {...screenshot} />
        ))}
      </SRLWrapper>
    </Flex>
  );
};

const Screenshot = styled(Image)`
  cursor: pointer;
  width: 300px;
  border-radius: 10%;
  transition: all 0.4s ease-out;
  box-shadow: 0 10px 5px ${({ theme }) => theme.colors.primary};
  margin: 2rem;

  &:hover {
    filter: brightness(120%);
  }
`;

const Background = () => (
  <>
    <Triangle
      color="secondary"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      position="bottom-left"
    />

    <Triangle
      color="primary"
      height={['20vh', '40vh']}
      width={['75vw', '70vw']}
      position="top-right"
    />

    <Triangle
      color="muted"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
    />
  </>
);

export default Projects;

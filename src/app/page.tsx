'use client';

import { motion } from 'framer-motion';
import { Heart, Users, MapPin, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-orange-100 to-orange-200">
      {/* Hero Section */}
      <Container className="pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1 
            className="text-6xl font-bold text-dusk mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welkom by die <span className="text-ochre">Digital Veld</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-dusk/80 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Stap in die Veld waar Suid-Afrikaners verbind. Ontdek jou mense, deel jou stories, 
            en bou betekenisvolle verhoudings in ons lewendige gemeenskap.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              variant="primary" 
              size="lg"
              className="bg-ochre hover:bg-ochre/90 text-white shadow-lg hover:shadow-xl"
            >
              <Heart className="mr-2 h-5 w-5" />
              Vind Jou Mense
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-protea text-protea hover:bg-protea hover:text-white"
            >
              <Users className="mr-2 h-5 w-5" />
              Verken die Veld
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Features Section */}
      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <Card className="text-center hover:shadow-ember transition-all duration-300">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-ochre to-sunset rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dusk mb-2">3D Encounters</h3>
              <p className="text-dusk/70">
                Ervaar profile kaarte in &apos;n nuwe dimensie met ons revolusionêre 3D swipe interface.
              </p>
            </motion.div>
          </Card>

          <Card className="text-center hover:shadow-ember transition-all duration-300">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-protea to-sky rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dusk mb-2">Hyper-Local Echoes</h3>
              <p className="text-dusk/70">
                Los digitale spore by jou gunsteling plekke en ontdek wie anders daar was.
              </p>
            </motion.div>
          </Card>

          <Card className="text-center hover:shadow-ember transition-all duration-300">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-sunset to-ember rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dusk mb-2">AI Story Weaving</h3>
              <p className="text-dusk/70">
                Ons AI weef jou stories saam met ander se stories om unieke verbindings te skep.
              </p>
            </motion.div>
          </Card>
        </motion.div>
      </Container>

      {/* CTA Section */}
      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-ochre/10 to-protea/10 rounded-2xl p-12"
        >
          <h2 className="text-4xl font-bold text-dusk mb-4">
            Gereed om jou reis te begin?
          </h2>
          <p className="text-xl text-dusk/80 mb-8">
            Sluit aan by duisende Suid-Afrikaners wat reeds hul mense gevind het.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            className="bg-gradient-to-r from-ochre to-sunset hover:from-ochre/90 hover:to-sunset/90 text-white shadow-lg hover:shadow-xl campfire-glow"
          >
            Begin Jou Avontuur
          </Button>
        </motion.div>
      </Container>
    </div>
  );
}
